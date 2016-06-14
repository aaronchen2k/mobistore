import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {PostService} from './post';

@Injectable()
export class MsgService {
    static ENDPOINT: string = '/msgs/:id';
    product: any;

    constructor(private _postService: PostService) {
    
    }

    list() {
      return this._postService.get(MsgService.ENDPOINT.replace(':id', ''));
    }
}

