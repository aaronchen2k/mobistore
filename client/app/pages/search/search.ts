import {Page} from 'ionic-angular';
import {NavController,ViewController, NavParams, Modal} from 'ionic-angular';
import {ImgPathPipe} from '../../pipes/img-path';

import {PostService}    from '../../services/post';
import {SearchService}    from '../../services/search';

@Page({
    templateUrl: 'build/pages/search/search.html',
    providers: [PostService,SearchService],
    directives: [],
    pipes: [ImgPathPipe]
})
export class Search {
    viewCtrl: ViewController;
    searchService: SearchService;

    searchQuery: string = '';
    hots: any;
    histories: any;
    keywordsResult: any;
    showResult:boolean = false;
    errorMessage: any;

    constructor(viewCtrl: ViewController, _searchService: SearchService) {
       this.viewCtrl = viewCtrl;
       this.searchService = _searchService;

       this.getHistory();
    }

    close() {
       this.viewCtrl.dismiss(undefined);
    }
    clear() {
        console.log('clear');
        this.showResult = false;
    }
    loadKeywords(searchbar) {
        var q = searchbar.value;
        if (q.trim() == '') {
          return;
        }
        console.log(q);
        this.searchService.getMatchedKeywords(q).subscribe(
            json => {this.keywordsResult = json.data;},
            error => this.errorMessage = <any>error
        );
        this.showResult = true;
    }

    getHistory() {
        this.searchService.getHistory().subscribe(
            json => {this.hots = json.data.hots; this.histories = json.data.histories;},
            error => this.errorMessage = <any>error
        );
    }
    search(keywords) {
       this.viewCtrl.dismiss(keywords);
    }

}
