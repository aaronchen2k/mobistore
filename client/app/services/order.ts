import {Injectable} from '@angular/core';
import {PostService} from './post';
import {Order} from '../models/order';

@Injectable()
export class OrderService {
    constructor(private _postService: PostService) { }

    _list = '/order/list';
    _detail = '/order/detail';
    _cancel = '/order/cancel';
    _changeRecipient = '/order/changeRecipient';

    list(status) {
        return this._postService.post(this._list, {filter: status});
    }

    getDetail(orderId) {
        return this._postService.post(this._detail, {orderId: orderId});
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