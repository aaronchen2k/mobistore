import {StrClient} from './StrClient';

export class Category{
  constructor(
	sendTime: Date,
	title: string,
	descr: string,
  isRead: boolean,
  enabled: boolean,

	client: StrClient
  ) {}
}
