import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {PostService} from './post';

@Injectable()
export class ProductService {
    static ENDPOINT: string = '/products/:id';
    product: any;

    constructor(private _postService: PostService) {

    }

    getDetail(productId) {
        return this._postService.get(ProductService.ENDPOINT.replace(':id', productId));
    }

    // add(product: any):Observable<any> {
    //     let _productStringified = JSON.stringify(product);
    //
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //
    //     return this._http
    //         .post(ProductService.ENDPOINT.replace(':id', 'add'), _productStringified, {headers})
    //         .map((r) => r.json());
    // }
    //
    // remove(id: string):Observable<any> {
    //     return this._http
    //         .delete(ProductService.ENDPOINT.replace(':id', id));
    // }
}
