import {corelink} from "../pages/corelink.browser.lib"

export const login = (
    username: string, password: string,
    host: string, port: number
) => async () => {
    try {
        const control: any = corelink;

        return await control
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
            })
    } catch (error) {
        console.log("error = " + error)
    }
}

export const logout = () => async () => {
    const control: any = corelink;

    await control.generic({ function: "disconnect" } );
    await control.generic({ function: "expire" } );
}
