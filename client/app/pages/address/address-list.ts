import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {BooleanToCn}    from '../../pipes/misc';

import {AddressService}    from '../../services/address';
import {PostService}    from '../../services/post';

import {AddressEdit}    from './address-edit';

@Page({
  templateUrl: 'build/pages/address/address-list.html',
  providers: [AddressService,PostService],
  pipes: [BooleanToCn]
})
export class AddressList {
    errorMessage: any;
    private addresses: any[];
    
    constructor(private nav: NavController, params: NavParams, private viewCtrl: ViewController, private addressService: AddressService) {

    }

    onPageWillEnter(): void {
        let me = this;

        me.addressService.list().subscribe(
            json => {me.addresses = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    edit(addressId) {
        let me = this;
        this.nav.push(AddressEdit, {addressId: addressId});
    }
}
