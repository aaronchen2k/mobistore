import {SysUser} from './SysUser';

export class SysRole{
  constructor(
    code: string,
    name: string,
    enabled: boolean,

    users : [SysUser]
) {}
}
