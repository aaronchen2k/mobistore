import {StrRecipient} from './StrRecipient';
import {StrClient} from './StrClient';
import {StrOrderItem} from './StrOrderItem';

export class StrOrder {
  constructor(
  currency:string,
  payChannel:number,
  amount:number,
  freight:number,
  totalAmount:number,
  payAmount:number,
  recipientArea:string,
  recipientStreet:string,
  recipientAddress:string,
  recipientName:string,
  recipientPhone:string,
  createTime:Date,
  payTime:Date,
  shipTime:Date,
  image:string,
  status:string,
  enabled:boolean,
  recipient:StrRecipient,
  client:StrClient,
  items:StrOrderItem[]
  ) {}
}

