import {} from '@angular/core';
import {Page, ViewController, NavParams} from 'ionic-angular';

import {AddressService}    from '../../services/address';
import {PostService}    from '../../services/post';

@Page({
  templateUrl: 'build/pages/address/area-selection.html',
  providers: [AddressService,PostService],
  pipes: []
})
export class AreaSelection {
    errorMessage: any;
    private areas: any[];

    constructor(params: NavParams, private viewCtrl: ViewController, private addressService: AddressService) {
        let me = this;

        let type = params.data.type;
        let provinceId = params.data.provinceId;
        let cityId = params.data.cityId;

        me.addressService.listArea(type, provinceId, cityId).subscribe(
            json => {me.areas = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    onPageWillEnter(): void {

    }

    select(area) {
        this.viewCtrl.dismiss(area);
    }

    cancel() {
        this.viewCtrl.dismiss(undefined);
    }
}
