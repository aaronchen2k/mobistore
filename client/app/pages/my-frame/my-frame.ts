
import {Page, ViewController, NavParams} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/my-frame/my-frame.html',
    providers: [],
    pipes: []
})
export class MyFrame {
    private info: any;

    constructor(params: NavParams, private viewCtrl: ViewController) {
        this.info = params.data;
    }

    ngOnInit() {

    }

    cancel() {
        this.viewCtrl.dismiss(undefined);
    }
}


