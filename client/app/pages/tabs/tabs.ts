import {Component,ViewChild,OnInit, Type} from '@angular/core';
import {Page,NavController,Tabs, Tab} from 'ionic-angular';
import {VARIABLE} from '../../utils/variable';
import {PubSubService} from '../../services/pub-sub-service';
import {Home} from '../home/home';
import {Find} from '../find/find';
import {Shoppingcart} from '../shoppingcart/shoppingcart';
import {Mine} from '../mine/mine';

import {Category} from '../../models/category';

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
    shoppingcartTab: any = Shoppingcart;
    mineTab: any = Mine;

    categories: Category[] = [];
    shoppingcartItemCount: number;
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
        PubSubService.getInstance().shoppingcart.subscribe(
            itemCount => me.shoppingcartItemCount = itemCount
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
        VARIABLE.CURRENT_CATEGORY = category.id;
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

