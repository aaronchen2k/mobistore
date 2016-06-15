import {StrProduct} from './StrProduct';
import {StrShoppingCart} from './StrShoppingCart';

export class StrShoppingCartItem{
  constructor(
  createTime: Date,
	unitPrice: number,
	qty: number,
	amount: number,
	freight: number,
	freightFreeIfTotalAmount: number,
	name: string,
	image: string,
  enabled: boolean,
  checkout: boolean,

	product: StrProduct,
	shoppingCart: StrShoppingCart
  ) {}
}

