import {Injectable} from '@angular/core';
import {PostService} from './post';

@Injectable()
export class AddressService {
    constructor(private _postService: PostService) { }

    _address = '/recipients/:id';

    _listAreas = '/areas/list';

    list() {
        return this._postService.get(this._address.replace(':id', ''));
    }

    detail(addressId) {
        return this._postService.get(this._address.replace(':id', addressId));
    }

    save(address) {
        return this._postService.post(this._address.replace(':id', ''), address);
    }
    remove(addressId) {
        return this._postService.delete(this._address.replace(':id', addressId));
    }

    listArea(type, provinceId, cityId) {
      return this._postService.post(this._listAreas, {type:type, provinceId:provinceId, cityId:cityId});
    }
}
