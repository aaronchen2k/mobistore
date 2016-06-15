import {SysRole} from './SysRole';

export class SysUser{
  constructor(
    email: string,
    password: string,
    nickName: string,
    lastLoginTime: Date,
    enabled: boolean,

    roles : [SysRole]
) {}
}
