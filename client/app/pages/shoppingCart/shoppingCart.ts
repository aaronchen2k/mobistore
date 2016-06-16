import {Page} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';

import {PubSubService} from '../../services/pub-sub-service';
import {ShoppingCartService}    from '../../services/shoppingCart';

import {OrderDetail} from '../order/order-detail';

@Page({
  templateUrl: 'build/pages/shoppingCart/shoppingCart.html',
  providers: [ShoppingCartService, PubSubService],
  pipes: [ImgPathPipe,CurrencyCnyPipe]
})
export class ShoppingCart {
    timer: any;
    cart: any;
    errorMessage: any;

    constructor(private nav: NavController, private _shoppingCartService: ShoppingCartService) {

    }
    onPageWillEnter(): void {
        let me = this;
        this._shoppingCartService.getData().subscribe(
            json => this.cart = json.data,
            error => this.errorMessage = <any>error
        );
    }

    remove(item) {
        this._shoppingCartService.remove(item).subscribe(
            json => { this.cart = json.data; PubSubService.getInstance().shoppingCart.emit(json.data.items.length) },
            error => this.errorMessage = <any>error
        );
    }

    qtyChange(item) {
      let me = this;
      clearTimeout(me.timer);
      me.timer = setTimeout(function() {
        me._shoppingCartService.changeQty(item.id, item.qty).subscribe(
          json => {me.cart = json.data; PubSubService.getInstance().shoppingCart.emit(json.data.items.length) },
          error => me.errorMessage = <any>error
        );
      }, 600);
    }

    clear() {
        this._shoppingCartService.clear().subscribe(
            json =>  { this.cart = json.data; PubSubService.getInstance().shoppingCart.emit(json.data.items.length) },
            error => this.errorMessage = <any>error
        );
    }

    checkout() {
        let me = this;
        me._shoppingCartService.checkout().subscribe(
            json =>  {
                PubSubService.getInstance().shoppingCart.emit(0);
                me.nav.push(OrderDetail, json.data.id);
            },
            error => this.errorMessage = <any>error
        );
    }


}
