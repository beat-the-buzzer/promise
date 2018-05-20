 ####Promise

1、What is Promise?

> The Promise object is used for asynchronous computations.
> A Promise represents a value which may be available now, or in the future, or never.

 - Promise用于异步计算
 - 可以将异步操作队列话，按照期望的顺序执行
 - 在对象之间传递和操作Promise

2、Why we use Promise?

 - javascript为检查表单而生
 - 创造javascript的主要目的是操作DOM
 - 因此，javascript的操作大多是异步的
 - 避免页面冻结

3、异步的简单例子

 - 事件监听与响应

		document.getElementById('start').addEventListener('click',start,false);
		function(){
			//do something
		}
		$('#start').on('click',start);

 - 回调：

		$.ajax(url,{
			success:fucntion(res){
				//
			}
		})

4、异步回调的问题

回调地狱：

	a(function(resultsFormA)) {
		b(resultsFormA,function(resultsFormB)) {
			c(resultsFormB,function(resultsFormC)) {
				d(resultsFormC,function(resultsFormD)) {
					e(resultsFormD,function(resultsFormE)) {
						console.log(resultsFormE);
					})
				})
			})
		})
	});

 - 嵌套层次很深，难以维护

其他问题：

假设有一个需求：遍历目录，找出最大的一个文件

[https://github.com/beat-the-buzzer/promise/tree/master/callback-demo](https://github.com/beat-the-buzzer/promise/tree/master/callback-demo)

 - 无法正常使用return和throw
 - 异步回调函数是在一个新的栈里面运行的，所以我们无法获取之前的栈的信息；
 - 我们无法判断操作什么时候结束，所以只能把变量定义在外层，这样导致这些变量可能会被其他函数访问和修改；

5、Promise的使用(then)

	new Promise(
		// 执行器 executor
		function(resolve,reject) {
			// 一段耗时很长的异步操作
			resolve(); // 数据处理完成
			reject(); // 数据处理出错
		} 
	).then(function　A(){

	},function B(){

	});

![https://raw.githubusercontent.com/beat-the-buzzer/pictures/master/promise/promise1.png](https://raw.githubusercontent.com/beat-the-buzzer/pictures/master/promise/promise1.png)

> Promsise是一个代理对象，它和原先要进行的操作没有关系；它通过引入一个回调，避免了更多的回调

Promise有三个状态：

 - pending:待定状态，初始状态
 - fulfilled：实现状态，操作成功，调用resolve的时候
 - rejected：被否决，操作失败，调用reject的时候

> Promise状态发生改变的时候，就会触发.then里面的响应函数进行处理，Promise的状态改变之后，就不会再变

下面是一些小例子，可以运行，感受一下

[https://github.com/beat-the-buzzer/promise/tree/master/easy-demo-then](https://github.com/beat-the-buzzer/promise/tree/master/easy-demo-then)

关于.then

 -  .then()接受两个函数作为参数，分别代表fulfilled和rejected；
 -  .then()返回一个新的Promise 实例，所以可以链式调用；
 -  当前面的Promise状态改变时，
 -  .then()根据其最终状态，选择特定的状态响应函数去执行
 -  状态响应函数可以返回新的Promise，或其他值
 -  如果返回新的Promise，那么下一级.then()会在新Promise状态改变之后执行；
 -  如果返回的是其他任何值，就会立刻执行下一级.then()

问题：下面的四种Promise的区别是什么

	// #1
	doSomething().then(function(){
		return doSomethingElse();
	})

	// #2
	doSomething().then(function(){
		doSomethingElse();
	})

	// #3
	doSomething().then(doSomethingElse());

	// #4
	doSomething().then(doSomethingElse);

问题1：doSomething->doSomethingElse->最后的处理函数

问题2：没有return，所以doSomething->doSomethingElse&最后的处理函数

问题3：doSoemthing & doSomethingElse -> 最后的处理函数，对doSomething的结果进行处理

问题4：doSomething->doSomethingElse(处理doSomething的结果)->最后的处理函数(处理doSomethingElse的结果)

参考链接：[http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/](http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/)

6、Promise的使用(catch)

> Promise会自动捕获内部异常，并交给rejected响应函数处理

[https://github.com/beat-the-buzzer/promise/tree/master/easy-demo-catch](https://github.com/beat-the-buzzer/promise/tree/master/easy-demo-catch)

错误处理的两种方法：

 - reject('错误信息').then(null, message => {})
 - throw new Error('错误信息').catch(message => {})

推荐使用第二种方法，更加清晰易读，并且可以捕获前面的错误（then里面发生错误的时候，也能捕获到）

 > 注意：建议在所有队列最后都加上.catch()，以免漏掉错误处理造成意想不到的问题

