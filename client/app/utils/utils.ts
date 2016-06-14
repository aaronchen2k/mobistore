import {Injectable} from '@angular/core';

import {CONSTANT} from './constant';
import {VARIABLE} from './variable';

@Injectable()
export class Utils {
  constructor() { }

  static ClientCofig (){
    Utils.SetServiceUrl();
    Utils.SetPlatformType();
  }

  static SetServiceUrl (){
    let host = window.location.host;
    if (!CONSTANT.SERVICE_URL) {
      if (host.indexOf("localhost") > -1 || host.indexOf("127.") > -1 || host.indexOf("10.") > -1) {
        CONSTANT.SERVICE_URL = CONSTANT._SERVICE_URL_DEV;
      } else {    // production
        CONSTANT.SERVICE_URL = CONSTANT._SERVICE_URL_PRODUCTION;
      }
    }
  }

  static SetPlatformType (){
    let sUserAgent = navigator.userAgent;
    // Android iPhone iPad

    if ( sUserAgent.toLowerCase().indexOf('android') > -1 ) {
      VARIABLE.PLATFORM_TYPE = 'ios';
    } else if ( sUserAgent.toLowerCase().indexOf('iphone') > -1
      || sUserAgent.toLowerCase().indexOf('ipad') > -1 ) {
      VARIABLE.PLATFORM_TYPE = 'android';
    }
    console.log('VARIABLE.PLATFORM_TYPE = ' + VARIABLE.PLATFORM_TYPE);
  }

  static IsAndroid(){
    return VARIABLE.PLATFORM_TYPE === 'android';
  }
  static IsIos(){
    return VARIABLE.PLATFORM_TYPE === 'ios';
  }
}
