import {Injectable} from '@angular/core';

import {PostService} from './post';

@Injectable()
export class CategoryService {
    constructor(private _postService: PostService) { }
    
    _path = '/category/list';

    getData() {
        return this._postService.post(this._path, {});
    }
}