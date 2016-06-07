import {Output, EventEmitter} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Observable}       from 'rxjs/Observable';
import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';
import {Product} from '../../models/product';

import {StringUtil} from '../../utils/string';
import {PubSubService} from '../../services/pub-sub-service';
import {ProductService}    from '../../services/product';
import {ShoppingcartService}    from '../../services/shoppingcart';

@Page({
  templateUrl: 'build/pages/product/product-detail.html',
  providers: [ProductService,ShoppingcartService, PubSubService],
  pipes: [ImgPathPipe,CurrencyCnyPipe]
})
export class ProductDetail {

    private errorMessage: any;
    private productId: string;
    private product: Product;
    private isCollected: boolean;
    private qty: number = 1;

    constructor(nav: NavController, params: NavParams,
                private _productService: ProductService, private _shoppingcartService: ShoppingcartService) {
        let me = this;
        me.productId = params.data;
        me.getDetail();
    }

    getDetail () {
        let me = this;
        me._productService.getDetail(me.productId).subscribe(
            json => {me.product = json.data; me.isCollected = json.isCollected;} ,
            error => me.errorMessage = <any>error
        );
    }

    collect () {
        let me = this;

        me._productService.collect(this.productId).subscribe(
            json => {
                if (json.code > 0) {
                    me.isCollected = json.data.enabled;
                }
            },
            error => me.errorMessage = <any>error
        );
     }

     toShoppingcart() {
        PubSubService.getInstance().gotoTab.emit(2);
     }

     addToShoppingcart() {
        this._shoppingcartService.addToShoppingcart(this.product, this.qty).subscribe(
            json => PubSubService.getInstance().shoppingcart.emit(json.data.items.length),
            error => this.errorMessage = <any>error
        );
     }

     reduceQty() {
          if (StringUtil.IsString(this.qty)) {
              this.qty = parseInt(StringUtil.Trim(this.qty))
          }

          if (this.qty > 1) {
              this.qty -= 1;
          }
     }

     addQty() {
          if (StringUtil.IsString(this.qty)) {
              this.qty = parseInt(StringUtil.Trim(this.qty))
          }
          if (this.qty < this.product.qty) {
              this.qty += 1;
          }
     }
}
