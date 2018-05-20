console.log('start');
new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    },2000);
})
.then(value => {
    console.log(value + ' world');
});
console.log('end');
