const electron = require('electron');
const addon = require('bindings')('cmake-js-electron.node');

electron.app.whenReady()
    .then(() => {
        const window = new electron.BrowserWindow({
            backgroundColor: '#ffffff',
            width: 500,
            height: 600,
            webPreferences: { sandbox: true },
        });
        window.loadURL('data:text/html;charset=utf-8,<head> ' +
            '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> ' +
            '<title>Should print "Hello, World!"</title> ' +
            '</head> ' +
            `<body><h1>${addon.Hello()}</h1></body>`)
            .catch(console.error);
    })
    .catch(console.error);
