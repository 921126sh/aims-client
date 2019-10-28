import * as electron from 'electron';

export class updater {
  APP_VERSION = require('./package.json').version;

  AUTO_UPDATE_URL: any = 'http://localhost:5656/' + process.platform + '/' + this.APP_VERSION;
  constructor(){}

  init () {
    if (process.platform === 'linux') {
      console.log('Auto updates not available on linux')
    } else {
      this.initDarwinWin32();
    }
  }
  
  initDarwinWin32 () {
    debugger;
    electron.autoUpdater.on(
      'error',
      (err) => console.log(`Update error: ${err.message}`))
  
      electron.autoUpdater.on(
      'checking-for-update',
      (x) => console.log(x + 'Checking for update'))
  
      electron.autoUpdater.on(
      'update-available',
      (x ) => console.log(x + 'Update available'))
  
      electron.autoUpdater.on(
      'update-not-available',
      (x) => console.log(x + 'No update available'))
  
    // Ask the user if update is available
    electron.autoUpdater.on(
      'update-downloaded',
      (event, releaseNotes, releaseName) => {
        console.log('Update downloaded')
        electron.dialog.showMessageBox({
          type: 'question',
          buttons: ['Update', 'Cancel'],
          defaultId: 0,
          message: `Version ${releaseName} is available, do you want to install it now?`,
          title: 'Update available'
        }, response => {
            console.log(event)
            console.log(releaseNotes)
            console.log(releaseName)
          if (response === 0) {
            electron.autoUpdater.quitAndInstall();
          }
        })
      }
    )
    
    electron.autoUpdater.setFeedURL(this.AUTO_UPDATE_URL)
    electron.autoUpdater.checkForUpdates()
  }
}

