import {StrClient} from './StrClient';

export class StrRecipient{
  constructor(
    name: string,
    phone: string,
    province: string,
    city: string,
    region: string,
    street: string,
    address: string,
    isDefault: boolean,
    enabled: boolean,
	  client: StrClient
) {}
}
