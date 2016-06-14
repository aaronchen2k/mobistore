import {Injectable} from '@angular/core';
import {PostService} from './post';

@Injectable()
export class AddressService {
    constructor(private _postService: PostService) { }

    _address = '/recipients/:id';
    _areas = '/areas';

    list() {
        return this._postService.get(this._address.replace(':id', ''));
    }

    detail(addressId) {
        return this._postService.get(this._address.replace(':id', addressId));
    }

    save(address) {
        return this._postService.post(this._address.replace(':id', ''), {address: address});
    }
    remove(addressId) {
        return this._postService.delete(this._address.replace(':id', addressId));
    }

    listArea(type, provinceId, cityId) {
      return this._postService.post(this._areas, {type:type, provinceId:provinceId, cityId:cityId});
    }
}
