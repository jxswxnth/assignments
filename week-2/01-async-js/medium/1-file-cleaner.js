const fs = require('fs');

fs.readFile('sample.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        data = data + ' ';
        const textArr = [];
        let text = '';
        let i = 0;
        while (i < data.length) {
            if (data[i] !== ' ') {
                text += data[i];
                i++;
            } else {
                textArr.push(text);
                while (data[i] === ' ') {
                    i++;
                }
                text = '';
            }
        }
        let newData = textArr.join(' ')
        fs.writeFile('sample.txt', newData, (err) => {
            if (err) console.log(err);
        })
    }
})

fs.readFile('sample.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})