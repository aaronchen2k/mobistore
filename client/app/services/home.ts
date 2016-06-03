import {Injectable} from '@angular/core';
import {PostService} from './post';

import {CONSTANT} from '../utils/constant';

@Injectable()
export class HomeService {
    constructor(private _postService: PostService) { }
    
    _index = '/home/index';

    getData() {
        return this._postService.post(this._index, {});
    }
	
}