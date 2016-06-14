import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams, Modal} from 'ionic-angular';

import {AddressService}    from '../../services/address';
import {PostService}    from '../../services/post';

import {AreaSelection} from './area-selection';

@Page({
  templateUrl: 'build/pages/address/address-edit.html',
  providers: [AddressService,PostService],
  pipes: []
})
export class AddressEdit {
    errorMessage: any;
    private address: any;
    private addressId: String;

    constructor(private nav: NavController, params: NavParams, private addressService: AddressService) {
        let me = this;

        me.addressId = params.data.addressId;

        me.addressService.detail(me.addressId).subscribe(
            json => {me.address = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    onPageWillEnter() {

    }

    openAreaModal(type) {
        let me = this;

        let modal = Modal.create(AreaSelection, {type: type, provinceId: me.address.provinceId, cityId: me.address.cityId});
        modal.onDismiss(area => {
            if (!area) {
                return;
            }

            me.address[type] = area.areaName;
            me.address[type + 'Id'] = area.id;
            if (type == 'province') {
                me.address.city = undefined;
                me.address.region = undefined;
            } else if(type == 'city') {
                me.address.region = undefined;
            }
        });
        this.nav.present(modal);
    }

    save() {
        let me = this;
        me.addressService.save(me.address).subscribe(
            json => { me.nav.pop(); },
            error => me.errorMessage = <any>error
        );
    }

    remove() {
        let me = this;
        me.addressService.remove(me.addressId).subscribe(
            json => { me.nav.pop(); },
            error => me.errorMessage = <any>error
        );
    }
}
