import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    static ENDPOINT: string = '/api/products/:id';
    product: any;

    constructor(@Inject(Http) private _http: Http) {

    }

    getDetail(productId) {
        var me = this;
        return this._http
            .get(productId)
            .map((r) => r.json());
    }

    collect(productId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(ProductService.ENDPOINT.replace(':id', 'collect'),
                JSON.stringify(productId), {headers} )
            .map((r) => r.json());
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