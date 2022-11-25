import {corelink} from "../pages/corelink.browser.lib"

const control: any = corelink

interface UserList {
    function: string,
    token?: string | null
}

export const listUsers = (func: string) => async () => {
    try {
        const option: UserList = {function: func}

        control
            .generic(option)
            .then((res: any) => {
                console.log("userList == ", res.userList)
            })

    } catch (error) {
        console.log("error = " + error)
    }
}
