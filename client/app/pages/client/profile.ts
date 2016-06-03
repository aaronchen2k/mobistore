import {} from '@angular/core';
import {Page, NavController, ViewController, NavParams} from 'ionic-angular';

import {ClientService}    from '../../services/client';
import {PostService}    from '../../services/post';

@Page({
  templateUrl: 'build/pages/client/profile.html',
  providers: [ClientService,PostService],
  pipes: []
})
export class Profile {
    errorMessage: any;
    private profile: any;

    constructor(private nav: NavController, params: NavParams, private viewCtrl: ViewController, private clientService: ClientService) {
        let me = this;

        me.clientService.getProfile().subscribe(
            json => {me.profile = json.data;},
            error => me.errorMessage = <any>error
        );
    }

    onPageWillEnter(): void {

    }

    save() {
        let me = this;
        console.log(me.profile);

        me.clientService.saveProfile(me.profile).subscribe(
            json => { me.nav.pop(); },
            error => me.errorMessage = <any>error
        );
    }
}
