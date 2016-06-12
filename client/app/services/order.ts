import {Injectable} from '@angular/core';
import {PostService} from './post';

@Injectable()
export class OrderService {
    constructor(private _postService: PostService) { }

    _list = '/orders/list';
    _detail = '/orders/:id';
    _cancel = '/orders/cancel';
    _changeRecipient = '/orders/changeRecipient';

    list(status) {
        return this._postService.post(this._list, {filter: status});
    }

    getDetail(orderId) {
        return this._postService.get(this._detail.replace(':id', orderId));
    }

    cancel(orderId) {
        return this._postService.post(this._cancel, {orderId: orderId});
    }

    changeRecipient(orderId, recipientId) {
        return this._postService.post(this._changeRecipient, {orderId: orderId, recipientId: recipientId});
    }

    pay(orderId, recipientId) {
        return this._postService.post(this._cancel, {orderId: orderId, recipientId: recipientId});
    }

}
