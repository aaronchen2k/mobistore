"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ionic_1 = require('ionic-angular/ionic');
var MyFrame = (function () {
    function MyFrame(params, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.info = params.data;
    }
    MyFrame.prototype.ngOnInit = function () {
    };
    MyFrame.prototype.cancel = function () {
        this.viewCtrl.dismiss(undefined);
    };
    MyFrame = __decorate([
        ionic_1.Page({
            templateUrl: 'build/page/my-frame/my-frame.html',
            providers: [],
            pipes: []
        })
    ], MyFrame);
    return MyFrame;
}());
exports.MyFrame = MyFrame;
//# sourceMappingURL=my-frame.js.map