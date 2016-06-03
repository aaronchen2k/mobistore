import {Injectable} from '@angular/core';
import {PostService} from './post';

@Injectable()
export class AddressService {
    constructor(private _postService: PostService) { }
    
    _list = '/address/list';
    _detail = '/address/detail';
    _listAreas = '/address/getAreas';

    _save = '/address/save';
    _remove = '/address/remove';

    list() {
        return this._postService.post(this._list, {});
    }

    detail(addressId) {
        return this._postService.post(this._detail, {addressId: addressId});
    }

    listArea(type, provinceId, cityId) {
        return this._postService.post(this._listAreas, {type:type, provinceId:provinceId, cityId:cityId});
    }

    save(address) {
        return this._postService.post(this._save, address);
    }
    remove(addressId) {
        return this._postService.post(this._remove, {addressId: addressId});
    }
}
