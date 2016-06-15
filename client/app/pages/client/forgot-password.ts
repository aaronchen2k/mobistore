import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {ClientService}    from '../../services/client';
import {PostService}    from '../../services/post';

@Page({
  templateUrl: 'build/pages/recipient/recipient-selection.html',
  providers: [ClientService,PostService],
  pipes: []
})
export class RecipientSelection {
    errorMessage: any;

    constructor(params: NavParams, private clientService: ClientService) {

    }

    onPageWillEnter(): void {

    }

    forgotPassword() {
        let me = this;
        me.clientService.forgotPassword('phone').subscribe(
            json => {},
            error => me.errorMessage = <any>error
        );
    }
}
