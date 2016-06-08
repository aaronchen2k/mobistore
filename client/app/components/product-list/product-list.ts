import {Component, Input, Output,OnInit, EventEmitter} from '@angular/core';
import {List,Item,Button,Icon} from 'ionic-angular';

import {ImgPathPipe} from '../../pipes/img-path';
import {CurrencyCnyPipe} from '../../pipes/currency-cny';

@Component({
    selector: 'product-list',
    templateUrl: 'build/components/product-list/product-list.html',
    directives: [List, Item,Button,Icon],
    pipes: [ImgPathPipe,CurrencyCnyPipe]
})

export class ProductListComponent {
    @Input() products: any[];
    @Output() selected: any = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit() {

    }

    onSelect(itemId) {
        this.selected.emit(itemId);
    }
}
