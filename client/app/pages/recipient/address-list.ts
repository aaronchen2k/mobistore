import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {BooleanToCn}    from '../../pipes/misc';

import {RecipientService}    from '../../services/recipient';
import {PostService}    from '../../services/post';

import {RecipientEdit}    from './recipient-edit';

@Page({
  templateUrl: 'build/pages/recipient/recipient-list.html',
  providers: [RecipientService,PostService],
  pipes: [BooleanToCn]
})
export class RecipientList {
    errorMessage: any;
    private recipients: any[];

    constructor(private nav: NavController, params: NavParams, private viewCtrl: ViewController, private recipientService: RecipientService) {

    }

    onPageWillEnter(): void {
        let me = this;

        me.recipientService.list().subscribe(
            json => {me.recipients = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    add(): void {
      let me = this;
      this.nav.push(RecipientEdit, {recipientId: undefined});
    }

    edit(recipientId): void {
        let me = this;
        this.nav.push(RecipientEdit, {recipientId: recipientId});
    }
}
