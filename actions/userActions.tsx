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
        .then(() => {
            control.createReceiver({
                workspace: "Log", proto: "ws",
                type: ["LogStream"], echo: false, alert: false,
            })
        })
}

export const logout = () => async () => {
    await control.generic({ function: "disconnect" } );
    await control.generic({ function: "expire" } );
}
