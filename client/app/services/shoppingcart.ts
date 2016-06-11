import {Injectable} from '@angular/core';
import {PostService} from './post';

@Injectable()
export class ShoppingcartService {
    constructor(private _postService: PostService) { }

    _infoPath = '/shoppingCart/info';
    _addItemPath = '/shoppingCart/addto';
    _removeItemPath = '/shoppingCart/remove';
    _changeQtyPath = '/shoppingCart/changeQty';
    _clearPath = '/shoppingCart/clear';
    _checkoutPath = '/shoppingCart/checkout';

    getData() {
        return this._postService.post(this._infoPath, {});
    }

    addToShoppingcart(product, qty) {
        return this._postService.post(this._addItemPath, {productId: product.id, qty: qty});
    }

    remove(item) {
        return this._postService.post(this._removeItemPath, {itemId: item.id});
    }

    changeQty(itemId, itemQty) {
      return this._postService.post(this._changeQtyPath, {itemId: itemId, itemQty: itemQty});
    }

    clear() {
        return this._postService.post(this._clearPath, {});
    }

    checkout() {
        return this._postService.post(this._checkoutPath, {});
    }
}
