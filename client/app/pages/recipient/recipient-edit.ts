import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams, Modal} from 'ionic-angular';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';

import {RecipientService}    from '../../services/recipient';
import {PostService}    from '../../services/post';

import {AreaSelection} from './area-selection';

@Page({
  templateUrl: 'build/pages/recipient/recipient-edit.html',
  providers: [RecipientService,PostService],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: []
})
export class RecipientEdit {
    errorMessage: any;
    private recipient: any;
    private recipientId: String;

    constructor(private fb: FormBuilder, private nav: NavController, params: NavParams, private recipientService: RecipientService) {
        let me = this;
        me.recipientId = params.data.recipientId;

        if (me.recipientId) {
          me.recipientService.detail(me.recipientId).subscribe(
            json => {me.recipient = json.data;},
            error => me.errorMessage = <any>error
          );
        } else {
          me.recipient = {_id: undefined, default: false};
        }
      console.log(me.recipient);
    }

    onPageWillEnter() {

    }

    openAreaModal(type) {
        let me = this;

        let modal = Modal.create(AreaSelection, {type: type, provinceId: me.recipient.provinceId, cityId: me.recipient.cityId});
        modal.onDismiss(area => {
            if (!area) {
                return;
            }

            me.recipient[type] = area.areaName;
            me.recipient[type + 'Id'] = area.id;
            if (type == 'province') {
                me.recipient.city = undefined;
                me.recipient.region = undefined;
            } else if(type == 'city') {
                me.recipient.region = undefined;
            }
        });
        this.nav.present(modal);
    }

    save(form) {
      form.submitted = true;

      if (!form.valid) {
        return false;
      }
      let me = this;
      console.log(me.recipient);
      me.recipientService.save(me.recipient).subscribe(
          json => {
            me.nav.pop();
          },
          error => me.errorMessage = <any>error
      );
    }

    remove() {
        let me = this;
        me.recipientService.remove(me.recipientId).subscribe(
            json => { me.nav.pop(); },
            error => me.errorMessage = <any>error
        );
    }
}
