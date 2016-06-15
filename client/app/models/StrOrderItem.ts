import {StrProduct} from './StrProduct';
import {StrOrder} from './StrOrder';

export class StrOrderItem{
  constructor(
	unitPrice: number,
	qty: number,
	amount: number,
	name: string,
	image: string,
  enabled: boolean,

	product: StrProduct,
	order: StrOrder
  ) {}
}
