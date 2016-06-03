import {OnInit} from '@angular/core';
import {Page} from 'ionic-angular';
import {NavController, NavParams, Modal} from 'ionic-angular';
import {ImgPathPipe} from '../../pipes/img-path';

import {PubSubService} from '../../services/pub-sub-service';
import {PostService}    from '../../services/post';
import {SearchService}    from '../../services/search';

import {DropmenuComponent} from '../../components/dropmenu/dropmenu';
import {ProductListComponent} from '../../components/product-list/product-list';
import {ProductDetail} from '../product/product-detail';

import {Search} from '../search/search';

@Page({
    templateUrl: 'build/pages/find/find.html',
    providers: [PostService, SearchService, PubSubService],
    directives: [DropmenuComponent,ProductListComponent],
    pipes: [ImgPathPipe]
})
export class Find implements OnInit {
    data: any;
    keywords: string = "";
    errorMessage: any;
    searchService: SearchService;
    subscription = null;

    constructor(private nav: NavController, private _searchService: SearchService) {
        let me = this;
        this.searchService = _searchService;
    }
    ngOnInit(){
        let me = this;
        this.search(this.keywords);

        me.subscription = PubSubService.getInstance().changeCategory.subscribe(
            category => me.search(this.keywords)
        );
    }

    onPageWillEnter(): void {

    }

    onProductSelected(item) {
        this.nav.push(ProductDetail, item.id);
    }

    openSearchModal() {
        let me = this;
        let modal = Modal.create(Search, {});
        modal.onDismiss(data => {
            console.log('=' + data + '=');
            me.search(data);
        });
        this.nav.present(modal);
    }

    search(keywords) {
        this.searchService.search(keywords).subscribe(
            json => {this.data = json.data;},
            error => this.errorMessage = <any>error
        );
    }
}
