import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  gapiSetup: boolean = false;
  authInstance: gapi.auth2.GoogleAuth;
  userId;
  noMetaFiles = [];

  constructor() {
    this.initGoogleAuth();
  }

  login() {
    return gapi.auth2.getAuthInstance().signIn().then(user => {
      sessionStorage.setItem('userId', user.getId())
      sessionStorage.setItem('userName', user.getBasicProfile().getName())
      sessionStorage.setItem('userImg', user.getBasicProfile().getImageUrl())
      window.location.reload();
    })
  }

  logout() {
    gapi.auth2.getAuthInstance().signOut().then(async () => {
      sessionStorage.clear();
      window.location.reload();
    })
  }

  async initGoogleAuth() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyANa-GBHtpctYjK-EOul151paIHy7RdEII',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      clientId: '518764999882-0mdhhrb3svvc8hf0936lif51s1m742pb.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive',
    }).then(function () {

    }, function(error) {
    });
  }

  async getTotalTime(url: string, includeSubFolders: boolean): Promise<number> {
    this.noMetaFiles = []
    let folderId = this.parseUrlToFolderId(url);
    let component = this;
    return await gapi.client.drive.files.list({
      'q': `'${folderId}' in parents`,
      'fields': 'files(id, name, mimeType, videoMediaMetadata)',
      'includeItemsFromAllDrives': true,
      'supportsAllDrives': true
    }).then(async function (response) {
      var files = response.result.files;
      if (files && files.length > 0) {
        let totalmillis = 0;
        for (let file of files) {
          if (file.videoMediaMetadata) {
            totalmillis = totalmillis + parseInt(file.videoMediaMetadata.durationMillis);
          } else if (file.mimeType !== 'application/vnd.google-apps.folder') {
            component.noMetaFiles.push(file)
          }
          if (includeSubFolders && file.mimeType === 'application/vnd.google-apps.folder') {
            totalmillis = totalmillis + await component.getTotalTime(`folders/${file.id}`, includeSubFolders);
          }
        }
        return totalmillis;
      } else {
        return 0
      }
    });
  }

  parseUrlToFolderId(url: string): string {
    if (url.includes('folders/')) {
      let rtnUrl = url.slice(url.indexOf('folders/') + 8, url.length);
      if (rtnUrl.includes('/')) {
        rtnUrl = rtnUrl.slice(0, rtnUrl.indexOf('/'));
      } 
      if (rtnUrl.includes('?')) {
        rtnUrl = rtnUrl.slice(0, rtnUrl.indexOf('?'));
      }
      return rtnUrl
    }
    alert("INVALID URL")
    return null;
  }

  


}

