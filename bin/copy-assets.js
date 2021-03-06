const ncp = require('ncp');

const assets = [
    'assets',
    'scripts'
];

assets.forEach(assetDir => {
    ncp('./' + assetDir, './dist/' + assetDir, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Copied directory ' + assetDir);
    })
});
