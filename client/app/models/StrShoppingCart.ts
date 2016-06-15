import {StrClient} from './StrClient';
import {StrShoppingCartItem} from './StrShoppingCartItem';

export class StrShoppingCart{
  constructor(
    createTime: Date,
    amount: number,
    freight: number,
    totalAmount: number,
    enabled: boolean,

    client: StrClient,
    items: [StrShoppingCartItem]
) {}
}
