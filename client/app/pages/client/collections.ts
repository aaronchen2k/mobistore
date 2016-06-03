import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';

import {ClientService}    from '../../services/client';
import {PostService}    from '../../services/post';

import {ProductDetail}    from '../../pages/product/product-detail';

@Page({
  templateUrl: 'build/pages/client/collections.html',
  providers: [ClientService,PostService],
  pipes: [ImgPathPipe,CurrencyCnyPipe]
})
export class Collections {
    errorMessage: any;
    private collections: any[];

    constructor(private nav: NavController, params: NavParams, private viewCtrl: ViewController, private clientService: ClientService) {
        let me = this;

        me.clientService.listCollections().subscribe(
            json => {me.collections = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    onPageWillEnter(): void {

    }

    showProdcut(productId) {
        this.nav.push(ProductDetail, productId);
    }

    removeCollection(collectionId) {
        let me = this;
        me.clientService.removeCollection(collectionId).subscribe(
            json => {me.collections = json.data;},
            error => me.errorMessage = <any>error
        );
    }
}
