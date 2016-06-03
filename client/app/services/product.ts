import {Injectable} from '@angular/core';
import {PostService} from './post';
import {Product} from '../models/product';

@Injectable()
export class ProductService {
    constructor(private _postService: PostService) { }
    
    _detail = '/product/detail';
    _collect = '/product/collect';

    getDetail(productId) {
        return this._postService.post(this._detail, {productId: productId});
    }
    
    collect(productId) {
        return this._postService.post(this._collect, {productId: productId});
    }
}