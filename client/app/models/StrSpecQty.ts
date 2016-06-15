import {StrProduct} from './StrProduct';
import {StrSpec} from './StrSpec';

export class Category{
  constructor(
	qty: number,
  enabled: boolean,

	product: StrProduct,

	color: StrSpec,
	size: StrSpec
  ) {}
}
