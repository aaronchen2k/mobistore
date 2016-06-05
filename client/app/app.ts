import {App, Platform,Tabs} from 'ionic-angular';
import {} from '@angular/core';
import {TabsPage} from './pages/tabs/tabs';

import {CONSTANT} from './utils/constant';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {mode: 'ios'} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    let host = window.location.host;
    if (!CONSTANT.SERVICE_URL) {
      if (host.indexOf("localhost") > -1 || host.indexOf("127.0.0.1") > -1) {
        CONSTANT.SERVICE_URL = CONSTANT.SERVICE_URL_DEV;
        CONSTANT.UPLOAD_URL = CONSTANT.UPLOAD_URL_DEV;
      } else {    // production
        CONSTANT.SERVICE_URL = CONSTANT.SERVICE_URL_PRODUCTION;
        CONSTANT.UPLOAD_URL = CONSTANT.UPLOAD_URL_PRODUCTION;
      }
      console.log(CONSTANT.SERVICE_URL);
    }

    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)

    });
  }
}
