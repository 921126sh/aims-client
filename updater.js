"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var updater = /** @class */ (function () {
    function updater() {
        this.APP_VERSION = require('./package.json').version;
        this.AUTO_UPDATE_URL = 'http://localhost:5656/' + process.platform + '/' + this.APP_VERSION;
    }
    updater.prototype.init = function () {
        if (process.platform === 'linux') {
            console.log('Auto updates not available on linux');
        }
        else {
            this.initDarwinWin32();
        }
    };
    updater.prototype.initDarwinWin32 = function () {
        debugger;
        electron.autoUpdater.on('error', function (err) { return console.log("Update error: " + err.message); });
        electron.autoUpdater.on('checking-for-update', function (x) { return console.log(x + 'Checking for update'); });
        electron.autoUpdater.on('update-available', function (x) { return console.log(x + 'Update available'); });
        electron.autoUpdater.on('update-not-available', function (x) { return console.log(x + 'No update available'); });
        // Ask the user if update is available
        electron.autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName) {
            console.log('Update downloaded');
            electron.dialog.showMessageBox({
                type: 'question',
                buttons: ['Update', 'Cancel'],
                defaultId: 0,
                message: "Version " + releaseName + " is available, do you want to install it now?",
                title: 'Update available'
            }, function (response) {
                console.log(event);
                console.log(releaseNotes);
                console.log(releaseName);
                if (response === 0) {
                    electron.autoUpdater.quitAndInstall();
                }
            });
        });
        electron.autoUpdater.setFeedURL(this.AUTO_UPDATE_URL);
        electron.autoUpdater.checkForUpdates();
    };
    return updater;
}());
exports.updater = updater;
//# sourceMappingURL=updater.js.map