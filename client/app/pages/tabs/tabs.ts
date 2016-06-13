import {Component,ViewChild,OnInit, Type} from '@angular/core';
import {Page,NavController,Tabs, Tab} from 'ionic-angular';
import {VARIABLE} from '../../utils/variable';
import {PubSubService} from '../../services/pub-sub-service';
import {Home} from '../home/home';
import {Find} from '../find/find';
import {ShoppingCart} from '../shoppingCart/shoppingCart';
import {Mine} from '../mine/mine';

import {CategoryService}    from '../../services/category';
import {PostService} from '../../services/post';

@Page({
    templateUrl: 'build/pages/tabs/tabs.html',
    directives: [],
    providers: [CategoryService, PostService, PubSubService]
})
export class TabsPage implements OnInit {
    @ViewChild(Tabs)
    tabs: Tabs;

    homeTab: any = Home;
    findTab: any = Find;
    shoppingCartTab: any = ShoppingCart;
    mineTab: any = Mine;

    categories: any[] = [];
    shoppingCartItemCount: number;
    errorMessage: any;

    subscription = null;

    constructor(private nav: NavController, private _categoryService: CategoryService) {

    }
    ngOnInit(){
        let me = this;
        me.subscription = PubSubService.getInstance().changeCategory.subscribe(
            category => me.processCategory(category)
        );
        PubSubService.getInstance().gotoTab.subscribe(
            index => me.gotoTab(index)
        );
        PubSubService.getInstance().shoppingCart.subscribe(
            itemCount => me.shoppingCartItemCount = itemCount
        );
    }

    onPageDidEnter(): void {

    }
    tabChanged() {
        if (this.tabs.selectedIndex == 2) {
            this.tabs.getSelected().popToRoot();
        }
    }

    processCategory(category){
        VARIABLE.CURRENT_CATEGORY = category;
        this.gotoTab(1);
    }
    gotoTab(index){
        let tabIndex = this.tabs.selectedIndex;

        if (tabIndex != index) {
            this.tabs.select(index);
        }
    }
    stopProcessing(){
        this.subscription.unsubscribe();
    }
}

