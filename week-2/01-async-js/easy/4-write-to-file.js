const fs = require('fs');

const dataToWrite = 'hi!\nhow are you?\n'

const dataToAppend = `what are you doing?`;

fs.writeFile('sample.txt', dataToWrite, (err) => {
    if (err) {
        console.log(err);
    } else {
        fs.readFile('sample.txt', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
})

fs.appendFile('sample.txt', dataToAppend, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('data written successfully!')
        fs.readFile('sample.txt', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
});

fs.writeFile('sample.txt', '', (err) => {
    if (err) {
        console.log(err);
    }
})