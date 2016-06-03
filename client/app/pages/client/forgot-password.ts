import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {ClientService}    from '../../services/client';
import {PostService}    from '../../services/post';

@Page({
  templateUrl: 'build/pages/address/address-selection.html',
  providers: [ClientService,PostService],
  pipes: []
})
export class AddressSelection {
    errorMessage: any;
    
    constructor(params: NavParams, private clientService: ClientService) {

    }

    onPageWillEnter(): void {

    }
    
    forgotPassword() {
        let me = this;
        me.clientService.forgotPassword().subscribe(
            json => {},
            error => me.errorMessage = <any>error
        );
    }
}
