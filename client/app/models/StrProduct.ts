import {StrClient} from './StrClient';

export class StrProduct{
  constructor(
	name: string,
	descr: string,
	image: string,

	freight: number,
	freightFreeIfTotalAmount: number,
	orderPeriod: number,
	qty: number,
	startTime: Date,
	endTime: Date,

	mass: number,
	capacity: number,
	color: string,
	size: string,

	batchNumb: string,
	productionDate: Date,
	shelfLife: number,

	recommend: boolean,
	hot: boolean,
	promotion: boolean,

	collect: number,
  retailPrice: number,
	discountPrice: number,
  enabled: boolean,

	tags: string,
	category: StrClient
  ) {}
}
