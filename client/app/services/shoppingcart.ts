import {Injectable} from '@angular/core';
import {PostService} from './post';
import {Product} from '../models/product';

@Injectable()
export class ShoppingcartService {
    constructor(private _postService: PostService) { }
    
    _infoPath = '/shoppingcart/info';
    _addItemPath = '/shoppingcart/addto';
    _removeItemPath = '/shoppingcart/remove';
    _clearPath = '/shoppingcart/clear';
    _checkoutPath = '/shoppingcart/checkout';

    getData() {
        return this._postService.post(this._infoPath, {});
    }
    
    addToShoppingcart(product, qty) {
        return this._postService.post(this._addItemPath, {productId: product.id, qty: qty});
    }
    
    remove(item) {
        return this._postService.post(this._removeItemPath, {itemId: item.id});
    }
    
    clear() {
        return this._postService.post(this._clearPath, {});
    }
    
    checkout() {
        return this._postService.post(this._checkoutPath, {});
    }
}