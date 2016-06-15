import {SysUser} from './SysUser';

export class Category{
  constructor(
	code: string,
	createTime: Date,
	expireTime: Date,
  enabled: boolean,

	user: SysUser
  ) {}
}
