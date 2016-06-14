import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {MsgService}    from '../../services/msg';
import {PostService}    from '../../services/post';

import {MsgDetail} from './msg-detail';

@Page({
  templateUrl: 'build/pages/msg/msg-list.html',
  providers: [MsgService,PostService],
  pipes: []
})
export class MsgList {
    errorMessage: any;
    private msgs: any;

    constructor(private nav: NavController, params: NavParams, private msgService: MsgService) {
        let me = this;

        me.msgService.list().subscribe(
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
