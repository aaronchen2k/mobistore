import {Output, EventEmitter} from '@angular/core';
import {Page, NavController, NavParams, Modal} from 'ionic-angular';
import {ImgPathPipe} from '../../pipes/img-path';
import {IosDatePipe} from '../../pipes/ios-date';

import {CurrencyCnyPipe} from '../../pipes/currency-cny';

import {OrderStatusPipe} from '../../pipes/order-status';
import {StringUtil} from '../../utils/string';
import {PubSubService} from '../../services/pub-sub-service';
import {OrderService}    from '../../services/order';

import {OrderDetail} from '../order/order-detail';

@Page({
  templateUrl: 'build/pages/order/order-list.html',
  providers: [OrderService,PubSubService],
  pipes: [ImgPathPipe, IosDatePipe, CurrencyCnyPipe,OrderStatusPipe]
})
export class OrderList {

    errorMessage: any;
    private status: string;
    private orders: string;
    constructor(private nav: NavController, params: NavParams, private orderService: OrderService) {
      let me = this;
      me.status = params.data;
    }

    onPageWillEnter() {
      let me = this;
      
      me.orderService.list(me.status).subscribe(
        json => me.orders = json.data,
        error => me.errorMessage = <any>error
      );
    }

    showOrder(orderId) {
        let me = this;
        this.nav.push(OrderDetail, orderId);
    }

}
