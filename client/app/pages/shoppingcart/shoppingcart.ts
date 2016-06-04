import {Page} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';

import {PubSubService} from '../../services/pub-sub-service';
import {ShoppingcartService}    from '../../services/shoppingcart';

import {OrderDetail} from '../order/order-detail';

@Page({
  templateUrl: 'build/pages/shoppingcart/shoppingcart.html',
  providers: [ShoppingcartService, PubSubService],
  pipes: [ImgPathPipe,CurrencyCnyPipe]
})
export class Shoppingcart {
    cart: any;
    errorMessage: any;
    
    constructor(private nav: NavController, private _shoppingcartService: ShoppingcartService) {
        
    }
    onPageWillEnter(): void {
        let me = this;
        this._shoppingcartService.getData().subscribe(
            json => this.cart = json.data,
            error => this.errorMessage = <any>error 
        );
    }
    
    remove(item) {
        this._shoppingcartService.remove(item).subscribe(
            json => { this.cart = json.data; PubSubService.getInstance().shoppingcart.emit(json.data.items.length) },
            error => this.errorMessage = <any>error 
        );
    }
    
    clear() {
        this._shoppingcartService.clear().subscribe(
            json =>  { this.cart = json.data; PubSubService.getInstance().shoppingcart.emit(json.data.items.length) },
            error => this.errorMessage = <any>error 
        );
    }
    
    checkout() {
        let me = this;
        me._shoppingcartService.checkout().subscribe(
            json =>  { 
                PubSubService.getInstance().shoppingcart.emit(0);
                me.nav.push(OrderDetail, json.orderId);
            },
            error => this.errorMessage = <any>error 
        );
    }

    
}
