import {Injectable} from '@angular/core';
import {PostService} from './post';

@Injectable()
export class RecipientService {
    constructor(private _postService: PostService) { }

    _recipient = '/recipients/:id';
    _areas = '/areas';

    list() {
        return this._postService.get(this._recipient.replace(':id', ''));
    }

    detail(recipientId) {
        return this._postService.get(this._recipient.replace(':id', recipientId));
    }

    save(recipient) {
        return this._postService.post(this._recipient.replace(':id', ''), {recipient: recipient});
    }
    remove(recipientId) {
        return this._postService.delete(this._recipient.replace(':id', recipientId));
    }

    listArea(type, provinceId, cityId) {
      return this._postService.post(this._areas, {type:type, provinceId:provinceId, cityId:cityId});
    }
}
