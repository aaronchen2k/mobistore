import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {ClientService}    from '../../services/client';
import {PostService}    from '../../services/post';

@Page({
  templateUrl: 'build/pages/msg/msg-detail.html',
  providers: [ClientService,PostService],
  pipes: []
})
export class MsgDetail {
    errorMessage: any;
    private msg: any;

    constructor(params: NavParams, private viewCtrl: ViewController, private clientService: ClientService) {
        let me = this;
        me.msg = params.data;
        console.log(me.msg);
    }

    onPageWillEnter(): void {

    }
}
