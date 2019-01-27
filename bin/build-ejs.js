const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

const walkSync = function(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist);
        }
        else {
            filelist.push(dir + file);
        }
    });
    return filelist;
};

const ejsFileRegex = /.*.ejs$/i;
const partialEjsFileRegex = /.*.partial.ejs$/i;
const fileList = walkSync('./');
const ejsFiles = fileList.filter(fileName => {
    return fileName.match(ejsFileRegex) && !fileName.match(partialEjsFileRegex);
});

ejsFiles.forEach(function (ejsFilePath) {
    ejs.renderFile(ejsFilePath, {}, {}, function (err, str) {

        const outPutHtmlPath = './dist/' + ejsFilePath.split('.ejs').join('.html');

        fs.promises.mkdir(path.dirname(outPutHtmlPath), {recursive: true}).then(x => {
            fs.writeFile(outPutHtmlPath, str, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        });
    });
});
