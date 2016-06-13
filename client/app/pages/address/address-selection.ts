import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {AddressService}    from '../../services/address';
import {PostService}    from '../../services/post';
import {isUndefined} from "ionic-angular/util";

@Page({
  templateUrl: 'build/pages/address/address-selection.html',
  providers: [AddressService,PostService],
  pipes: []
})
export class AddressSelection {
    errorMessage: any;
    private addresses: any[];
    private orderId: String;
    private recipientId: String;

    constructor(params: NavParams, private viewCtrl: ViewController, private addressService: AddressService) {
        let me = this;

        me.orderId = params.data.order.id;
        me.recipientId = params.data.order.recipient;

        me.addressService.list().subscribe(
            json => {me.addresses = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    onPageWillEnter(): void {

    }

    selectAddress(addressId) {
        this.recipientId = addressId;
        this.viewCtrl.dismiss(addressId);
    }

    cancel() {
        this.viewCtrl.dismiss(undefined);
    }
}
