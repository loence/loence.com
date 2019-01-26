const fs = require('fs-extra');

fs.readdir('src', function(err, items) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(items);
});
