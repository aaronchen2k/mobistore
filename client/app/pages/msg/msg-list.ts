import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {ClientService}    from '../../services/client';
import {PostService}    from '../../services/post';

import {MsgDetail} from './msg-detail';

@Page({
  templateUrl: 'build/pages/msg/msg-list.html',
  providers: [ClientService,PostService],
  pipes: []
})
export class MsgList {
    errorMessage: any;
    private msgs: any;

    constructor(private nav: NavController, params: NavParams, private clientService: ClientService) {
        let me = this;

        me.clientService.getMsgs().subscribe(
            json => {me.msgs = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    onPageWillEnter(): void {

    }

    showMsg(msg) {
        let me = this;
        me.nav.push(MsgDetail, msg);
    }
}
