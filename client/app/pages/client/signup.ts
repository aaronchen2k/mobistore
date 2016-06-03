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
    private username: String;
    private password: String;
    private repassword: String;
    
    constructor(params: NavParams, private clientService: ClientService) {

    }

    onPageWillEnter(): void {

    }
    
    signup() {
        let me = this;
        me.clientService.signup(me.username, me.password, me.repassword).subscribe(
            json => {},
            error => me.errorMessage = <any>error
        );
    }
}
