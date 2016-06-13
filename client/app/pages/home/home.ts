import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import {Page} from 'ionic-angular';
import {NavController, NavParams, Tab} from 'ionic-angular';

import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';

import {PubSubService} from '../../services/pub-sub-service';
import {CommonService}    from '../../services/common';
import {PostService}    from '../../services/post';
import {HomeService}    from '../../services/home';

import {DropmenuComponent} from '../../components/dropmenu/dropmenu';
import {ProductListComponent} from '../../components/product-list/product-list';
import {ProductDetail} from '../product/product-detail';

@Page({
    templateUrl: 'build/pages/home/home.html',
    providers: [PubSubService, CommonService, PostService, HomeService],
    directives: [DropmenuComponent, ProductListComponent],
    pipes: [ImgPathPipe,CurrencyCnyPipe]
})
export class Home {
    data: any;
    errorMessage: any;
    slideHeight: number;

    constructor(private nav: NavController,
                private _homeService: HomeService, private _commonService: CommonService) {
        let me = this;
        me.slideHeight = _commonService.getScreenSize().h * 0.3 / 14;
    }

    ngOnInit() {
        this.loadData();
    }

    onPageDidEnter(): void {

    }

    onProductSelected(itemId) {
        this.nav.push(ProductDetail, itemId);
    }

    loadData():void {
        var me = this;
        this._homeService
            .getData()
            .subscribe((json) => {
                me.data = json.data;
                PubSubService.getInstance().shoppingCart.emit(json.data.shoppingCartItemNumb);
            });
    }

}
