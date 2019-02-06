const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const path = require('path');
const ejs = require('ejs');
const minifier = require('html-minifier');

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
    ejs.renderFile(ejsFilePath, {}, {}, function (err, htmlContent) {

        const outPutHtmlPath = './dist/' + ejsFilePath.split('.ejs').join('.html');

        mkdirp(path.dirname(outPutHtmlPath), err => {

            if (err) {
                console.error(err);
            }

            const minifiedHtmlContent = minifier.minify(htmlContent, {
                removeComments: true,
                collapseWhitespace: true
            });

            fs.writeFile(outPutHtmlPath, minifiedHtmlContent, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        });
    });
});
