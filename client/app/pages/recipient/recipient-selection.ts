import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {RecipientService}    from '../../services/recipient';
import {PostService}    from '../../services/post';
import {isUndefined} from "ionic-angular/util";

@Page({
  templateUrl: 'build/pages/recipient/recipient-selection.html',
  providers: [RecipientService,PostService],
  pipes: []
})
export class RecipientSelection {
    errorMessage: any;
    private recipients: any[];
    private orderId: String;
    private recipientId: String;

    constructor(params: NavParams, private viewCtrl: ViewController, private recipientService: RecipientService) {
        let me = this;

        me.orderId = params.data.order.id;
        me.recipientId = params.data.order.recipient;

        me.recipientService.list().subscribe(
            json => {me.recipients = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    onPageWillEnter(): void {

    }

    selectRecipient(recipientId) {
        this.recipientId = recipientId;
        this.viewCtrl.dismiss(recipientId);
    }

    cancel() {
        this.viewCtrl.dismiss(undefined);
    }
}
