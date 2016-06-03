import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {ClientService}    from '../../services/client';
import {PostService}    from '../../services/post';

@Page({
  templateUrl: 'build/pages/client/suggestion.html',
  providers: [ClientService,PostService],
  pipes: []
})
export class Suggestion {
    errorMessage: any;
    private content: String = '';

    constructor(private nav: NavController, params: NavParams, private viewCtrl: ViewController, private clientService: ClientService) {

    }

    onPageWillEnter(): void {

    }

    save() {
        let me = this;
        me.clientService.saveSuggestion(me.content).subscribe(
            json => { me.nav.pop(); },
            error => me.errorMessage = <any>error
        );
    }
}

