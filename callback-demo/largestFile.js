// 遍历目录，找出最大的一个文件

const fs = require('fs');
const path = require('path');

function findLargest(dir, callback) {
	// 读取文件夹里面的内容
    fs.readdir(dir, function (err, files) {
        if (err) {
			return callback(err); // [1]
		}
        let count = files.length; // [2] 
        let errored = false;
		let stats = [];

		// 遍历文件夹里面的目录
        files.forEach( file => {
			// 取文件的状态
            fs.stat(path.join(dir, file), (err, stat) => {
                if (errored) {
					return; // [1]
				}
                if (err) {
                    errored = true;
                    return callback(err);
                }
				stats.push(stat); // [2] //　将文件的信息放进数组中
				

                if (--count === 0) {　
					// 文件读取完毕,寻找最大的文件
                    let largest = stats
                        .filter(function (stat) { 
							return stat.isFile(); 
						})
                        .reduce(function (prev, next) {
							if (prev.size > next.size) {
								return prev;
							}
                            return next;
                        });
					callback(null, files[stats.indexOf(largest)]);
					// 第一个参数表示是否发生了错误
                }
            });
        });
    });
}

findLargest('./path/to/dir', function (err, filename) {
    if (err) return console.error(err);
    console.log('largest file was:', filename);
});

/*
	问题[1]: 正常情况下，如果发生了错误，我们应该抛出错误，然后在外层捕获错误并处理；这里却没有这么做
	在异步回调函数里面，后面传递的匿名函数，也就是回调函数，在readdir之后才调用的，所以匿名回调函数和readdir不处于同一个执行栈
	如果使用try catch包裹fs.readdir，是无法捕获到错误的
*/

/*
	问题[2]：这里声明了一些变量，但是在下面的一个回调函数里面使用了。闭包的存在，导致了这些变量可以被其他函数访问、修改；
	但是这种不合理的方式却是唯一的方式，我们只能这么做，因为fs.stat是异步的，我们无法确认哪个文件先返回哪个文件后返回

*/