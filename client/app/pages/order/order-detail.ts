import {Output, EventEmitter} from '@angular/core';
import {Page, NavController, NavParams, Modal} from 'ionic-angular';
import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';
import {RecipientSelection} from '../recipient/recipient-selection';

import {OrderStatusPipe} from '../../pipes/order-status';
import {PubSubService} from '../../services/pub-sub-service';
import {OrderService}    from '../../services/order';

@Page({
  templateUrl: 'build/pages/order/order-detail.html',
  providers: [OrderService,PubSubService],
  pipes: [ImgPathPipe,CurrencyCnyPipe,OrderStatusPipe]
})
export class OrderDetail {

    errorMessage: any;
    private orderId: string;
    private order: any;
    private tab: number = 1;
    constructor(private nav: NavController, params: NavParams, private orderService: OrderService) {
        let me = this;

        me.orderId = params.data;
    }

    onPageWillEnter(): void {
        let me = this;
        me.orderService.getDetail(me.orderId).subscribe(
            json => {me.order = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    show(tab) {
        this.tab = tab;
    }

    cancel(orderId) {
        let me = this;
        me.orderService.cancel(orderId).subscribe(
            json => this.nav.pop(),
            error => me.errorMessage = <any>error
        );
    }

    openRecipientModel(order) {
        let me = this;

        let modal = Modal.create(RecipientSelection, {order: order});
        modal.onDismiss(recipientId => {
            me.changeRecipient(order.id, recipientId);
        });
        this.nav.present(modal);
    }
    changeRecipient(orderId, recipientId) {
        let me = this;

        if (!recipientId) {
            return;
        }

        me.orderService.changeRecipient(orderId, recipientId).subscribe(
            json => {me.order = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    pay(orderId) {
        let me = this;

        //let recipientId = 1;
        //me.orderService.pay(orderId, recipientId).subscribe(
        //    json => {PubSubService.getInstance().gotoTab.emit(4);},
        //   error => me.errorMessage = <any>error
        //);
    }
}
