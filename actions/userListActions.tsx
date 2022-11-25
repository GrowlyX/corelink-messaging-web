import {
    USERLIST_REQUEST,
    USERLIST_SUCCESS,
    USERLIST_FAIL
} from "../constants/userListConstants"

// @ts-ignore
import {corelink} from "../public/corelink.browser.lib"

const control: any = corelink

interface UserList {
    function: string,
    token?: string | null
}

export const listUsers = (func: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: USERLIST_REQUEST
        })

        const option: UserList = {function: func}

        control
            .generic(option)
            .then((res: any) => {
                console.log("userList == ", res.userList)

                dispatch({
                    type: USERLIST_SUCCESS,
                    payload: res.userList
                })
            })

    } catch (error) {
        dispatch({
            type: USERLIST_FAIL,
            payload: error
        })
    }
}
