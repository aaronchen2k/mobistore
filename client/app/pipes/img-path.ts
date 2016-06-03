import {Pipe, PipeTransform} from '@angular/core';

import {CONSTANT} from '../utils/constant';

@Pipe({name: 'imgPath'})
export class ImgPathPipe implements PipeTransform {
    transform(url: string, external: any) : string {
        if (!url) {
            return '../../assets/img/none.png';
        }
        
        if (!external)  {
            external = true;
        }

        if (external) {
            url = CONSTANT.SERVICE_URL + url;
        }
        return url;
    }
}