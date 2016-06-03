import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Category} from '../models/category';

@Injectable()
export class ChangeCategoryEventEmitter extends Subject<Category> {
    constructor() {
        super();
    }
    emit(value) {
        super.next(value);
    }
}

@Injectable()
export class GotoTabEventEmitter extends Subject<number> {
    constructor() {
        super();
    }
    emit(value) {
        super.next(value);
    }
}

@Injectable()
export class ShoppingcartChangeEventEmitter extends Subject<number> {
    constructor() {
        super();
    }
    emit(value) {
        super.next(value);
    }
}
