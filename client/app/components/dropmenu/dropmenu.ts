import {Component, Input, Output ,OnInit} from '@angular/core';
import {ImgPathPipe} from '../../pipes/img-path';
import {PubSubService} from '../../services/pub-sub-service';

@Component({
    selector: 'drop-menu',
    templateUrl: 'build/components/dropmenu/dropmenu.html',
    providers: [PubSubService],
    pipes: [ImgPathPipe]
})

export class DropmenuComponent {
    @Input() categories: any[];

    menuShow: Boolean = false;
    currentCategory: any = {};

    constructor() {

    }

    ngOnInit() {

    }

    showMenu() {
        this.menuShow = !this.menuShow;
    }

    select(category) {
        PubSubService.getInstance().changeCategory.emit(category);
        this.menuShow = false;
    }
}
