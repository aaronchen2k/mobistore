import {Injectable} from '@angular/core';
import {PostService} from './post';

import {CONSTANT} from '../utils/constant';

@Injectable()
export class MineService {
    constructor(private _postService: PostService) { }

    _mine = '/mine/index';

    getData() {
        return this._postService.post(this._mine, {});
    }
	

}