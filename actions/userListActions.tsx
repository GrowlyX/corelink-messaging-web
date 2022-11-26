import {corelink} from "../pages/corelink.browser.lib"

const control: any = corelink

interface UserList {
    function: string,
    token?: string | null
}

export const listUsers = (func: string) => async () => {
    const option: UserList = {function: func}
    return await control.generic(option)
}
