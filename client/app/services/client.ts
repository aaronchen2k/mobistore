import {Injectable} from '@angular/core';
import {PostService} from './post';

@Injectable()
export class ClientService {
    constructor(private _postService: PostService) { }

    _getProfile = '/client/getProfile';
    _saveProfile = '/client/saveProfile';
    _forgotPassword = '/client/forgotPassword';
    _signon = '/client/signon';
    _signup = '/client/signup';

    _saveSuggestion = '/client/suggest';
    _resetPassword = '/client/resetPassword';

    _listCollections = '/collection/list';
    _removeCollection = '/client/removeCollections';
    _getMsgs = '/msg/list';

    listCollections() {
        return this._postService.post(this._listCollections, {});
    }

    removeCollection(collectionId) {
        return this._postService.post(this._removeCollection, {collectionId: collectionId});
    }

    getMsgs() {
        return this._postService.post(this._getMsgs, {});
    }

    getProfile() {
        return this._postService.post(this._getProfile, {});
    }

    saveProfile(profile) {
        return this._postService.post(this._saveProfile, profile);
    }

    forgotPassword(phone) {
        return this._postService.post(this._forgotPassword, {phone:phone});
    }

    signon(phone, password, rememberMe) {
        return this._postService.post(this._signon, {phone:phone, password:password, rememberMe:rememberMe});
    }

    signup(phone, password, repassword) {
        return this._postService.post(this._signup, {phone:phone, password:password, repassword:repassword});
    }

    saveSuggestion(content) {
        return this._postService.post(this._saveSuggestion, {content: content});
    }

    resetPassword(phone) {
        return this._postService.post(this._resetPassword, {phone: phone});
    }
}
