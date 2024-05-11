const lerna = require('./lerna.json');
const fs = require('fs');

// 读取文件
fs.readFile('./package.json', 'utf8', (err, data) => {
    if (err) {
        return;
    }

    const newData = JSON.parse(data);
    newData.version = lerna.version;

    fs.writeFile('./package.json', JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            return;
        }
    });
});



