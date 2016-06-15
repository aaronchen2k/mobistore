import {StrRecipient} from './StrRecipient';

export class StrClient{
  constructor(
    mobile: string,
    password: string,
    nickName: string,
    email: string,
    authToken: string,
    verifyCode: string,
    lastLoginTime: Date,
    rewardPoints: number,
    enabled: boolean,

    // 当前登录的设备类型
    clientPlatform: string,
    // 当前登录的浏览器类型
    clientAgent: string,
    // 友盟设备Token
    deviceToken: string,

    recipients: StrRecipient[]
) {}
}
