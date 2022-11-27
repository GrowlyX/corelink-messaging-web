import {corelink} from "../pages/corelink.browser.lib"

const control: any = corelink;

export const login = (
    username: string, password: string,
    host: string, port: number
) => async () => {
    return await control
        .connect(
            { username: username, password: password },
            { ControlIP: host, ControlPort: port }
        )
}

export const logout = () => async () => {
    await control.generic({ function: "disconnect" } );
    await control.generic({ function: "expire" } );
}
