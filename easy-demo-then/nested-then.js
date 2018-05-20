// then()里有then()的情况
// then()返回的还是Promise实例
// 会等里面的.then()执行完再执行外面的
// 开发者最好把then()展开

console.log('start');
new Promise( resolve => {
    console.log('Step 1');
    setTimeout(() => {
        resolve(100);
    }, 1000);
})
    .then(value => {
        return new Promise(resolve => {
            console.log('Step 1-1');
            setTimeout(() => {
                resolve(110);
            }, 1000);
        })
            .then( value => {
                console.log('Step 1-2');
                return value;
            })
            .then( value => {
                console.log('Step 1-3');
                return value;
            });
    })
    .then(value => {
        console.log(value);
        console.log('Step 2');
    });