import {Injectable} from '@angular/core';

import {CONSTANT} from '../utils/constant';

@Injectable()
export class CommonService {
    constructor() { }

    getScreenSize () {
        var sh = window.screen.height;
                if (document.body.clientHeight < sh) {
                  sh = document.body.clientHeight;
                }
        
        var sw = window.screen.width;
                if (document.body.clientWidth < sw) {
                  sw = document.body.clientWidth;
                }
        
        //if (this.landscape && this.landscape() && sh > sw) {
        //    var temp = sh;
        //    sh = sw;
        //    sw = temp;
        //}
        
        return {h: sh, w: sw};
      }
}