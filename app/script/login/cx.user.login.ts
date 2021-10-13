
import { Utils, WaitForScript } from "@pioneerjs/core";
import { RunnableScript } from '@pioneerjs/core';

import { Runnable, Inject } from '@pioneerjs/common';
import { User } from "../../types";

import { CXLoginUtils } from "../common/login.utils";

import { LoginScript } from './types';

export const CX_USER_LOGIN_URL = 'https://passport2.chaoxing.com/login?loginType=1&newversion=true'
export const CX_USER_LOGIN_NAME = 'cx-user-login'



@Runnable({
    name: CX_USER_LOGIN_NAME,
 
})
export class CXUserLoginScript extends LoginScript {

    @Inject()
    waitFor!: WaitForScript;

    @Inject()
    utils!: Utils;

    @Inject()
    loginUtils!: CXLoginUtils

    async run(): Promise<void> { }

    async login(user: User): Promise<void> {
        await this.page.goto(CX_USER_LOGIN_URL)
        const { utils, loginUtils, waitFor } = this
        await waitFor.documentReady()
        const { phone, password } = user.loginInfo.cx.userLogin
        
        await utils.value('#phone', phone)
        await utils.value('#pwd', password)
        await loginUtils.login()
    }

}