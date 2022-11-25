import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from "../constants/userConstants";

import {control} from "/corelink-client/corelink.lib";

export const login = (
    username: string, password: string,
    host: string, port: number
) => async (dispatch: any) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        await control
            .connect(
                { username: username, password: password },
                { ControlIP: host, ControlPort: port }
            )
            .then((res: any) => {
                console.log("login res = ", res)

                control.createReceiver({
                    workspace: "Log", proto: "ws",
                    type: ["LogStream"], echo: false, alert: false,
                })

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: res
                })
            })

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        })
    }
}

export const logout = () => async (dispatch: any) => {
    dispatch({
        type: USER_LOGOUT
    })

    await control.generic({ function: "disconnect" } );
    await control.generic({ function: "expire" } );
}
