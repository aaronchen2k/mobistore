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
    private username: String;
    private password: String;
    private rememberMe: String;
    
    constructor(params: NavParams, private clientService: ClientService) {

    }

    onPageWillEnter(): void {

    }
    
    signon() {
        let me = this;
        me.clientService.signon(me.username, me.password, me.rememberMe).subscribe(
            json => {},
            error => me.errorMessage = <any>error
        );
    }
}
