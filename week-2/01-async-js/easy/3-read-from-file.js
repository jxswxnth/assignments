const fs = require('fs');

fs.readFile('sample.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const arr = data.split('\n')
        console.log(arr);
        console.log(arr[0]);
    }
})

let i = 10
setTimeout(() => {
    console.log(`setTimeOut - ${i}s`)
}, i);

console.log('heyyyyyy');