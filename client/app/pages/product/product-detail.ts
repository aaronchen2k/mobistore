import {Output, EventEmitter} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Observable}       from 'rxjs/Observable';
import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';

import {StringUtil} from '../../utils/string';
import {PubSubService} from '../../services/pub-sub-service';
import {ProductService}    from '../../services/product';
import {ShoppingCartService}    from '../../services/shoppingCart';
import {CollectionService}    from '../../services/collection';

@Page({
  templateUrl: 'build/pages/product/product-detail.html',
  providers: [ProductService,ShoppingCartService, CollectionService, PubSubService],
  pipes: [ImgPathPipe,CurrencyCnyPipe]
})
export class ProductDetail {

    private errorMessage: any;
    private productId: string;
    private product: any;
    private isCollected: boolean;
    private shoppingCartItemCount: number;
    private qty: number = 1;

    constructor(nav: NavController, params: NavParams,
                private _productService: ProductService, private _collectionService: CollectionService,
                private _shoppingCartService: ShoppingCartService) {
        let me = this;
        me.productId = params.data;
        me.getDetail();
    }

    ngOnInit(){
      let me = this;
      PubSubService.getInstance().shoppingCart.subscribe(
        itemCount => me.shoppingCartItemCount = itemCount
      );
    }

    getDetail () {
        let me = this;
        me._productService.getDetail(me.productId).subscribe(
            json => {
              me.product = json.data.product;

              me.isCollected = json.data.isCollected;
              me.shoppingCartItemCount = json.data.shoppingCartItemCount;
              PubSubService.getInstance().shoppingCart.emit(me.shoppingCartItemCount);
            } ,
            error => me.errorMessage = <any>error
        );
    }

    collect () {
        let me = this;

        me._collectionService.save(this.productId).subscribe(
            json => {
                if (json.code > 0) {
                    me.isCollected = json.data.enabled;
                }
            },
            error => me.errorMessage = <any>error
        );
     }

     toShoppingCart() {
        PubSubService.getInstance().gotoTab.emit(2);
     }

     addToShoppingCart() {
        let me = this;
        this._shoppingCartService.addToShoppingCart(this.product, this.qty).subscribe(
            json => {
              me.shoppingCartItemCount = json.data.items.length;
              PubSubService.getInstance().shoppingCart.emit(me.shoppingCartItemCount);
            },
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
