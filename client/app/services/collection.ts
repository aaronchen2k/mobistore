import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {PostService} from './post';

@Injectable()
export class CollectionService {
    static ENDPOINT: string = '/collections/:id';
    product: any;

    constructor(private _postService: PostService) {

    }

    list() {
      return this._postService.get(CollectionService.ENDPOINT.replace(':id', ''));
    }

    save(productId) {
       return this._postService.post(CollectionService.ENDPOINT.replace(':id', ''), {productId: productId});
    }

    delete(collectionId) {
      return this._postService.delete(CollectionService.ENDPOINT.replace(':id', collectionId));
    }
}

