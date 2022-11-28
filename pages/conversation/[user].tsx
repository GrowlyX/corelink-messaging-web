import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {corelink} from "../corelink.browser.lib";
import {datatype, protocol, workspace} from "../../constants/constants";

function ab2str(buf: Iterable<number>) {
    // @ts-ignore
    return String.fromCharCode.apply(null, new Uint8Array(buf))
}

function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length)
    const bufView = new Uint8Array(buf)

    for (let i = 0; i < str.length; i += 1) {
        bufView[i] = str.charCodeAt(i)
    }

    return buf
}

export default function User() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const [sender, setSender] = useState<any>(null)

    const [newMessage, setNewMessage] = useState("type here...")

    const router = useRouter()
    const {user} = router.query

    useEffect(() => {
        const control: any = corelink

        control
            .createSender({
                workspace, protocol,
                type: datatype,
                metadata: {
                    targetUser: user
                },
            })
            .then(async (res: any) => {

                await control
                    .createReceiver({
                        workspace, protocol,
                        type: datatype,
                        echo: true, alert: true
                    })
                    .catch((err: any) => {
                        console.log("Error = " + err)
                    })

                control.on('receiver', async (data: any) => {
                    const stream: any = {streamIDs: [data.streamID]}
                    await control.subscribe(stream)
                })

                control.on('data', (streamID: any, data: any, header: any) => {
                    try {
                        const json = JSON.parse(ab2str(data))

                        if (json.target == user) {
                            setMessages(result => [...result, json]);
                        }
                    } catch (exception) {
                        console.log("ERROR while trying to receive message = " + exception)
                    }
                })
                setSender(res)
                setLoading(false)
            }, (err: any) => {
                console.log("Error while creating SENDER = " + err)
            })
    }, [])

    if (loading)
        return <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Loading messages...</h1>
                <p>Please wait.</p>
            </main>
        </div>

    return (
        <div className={styles.container}>
            <Head>
                <title>Conversing with {user}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <ul>
                    {messages.map((message) => (
                        <li key={message.sent}>{message.content}</li>
                    ))}
                    //
                </ul>

                <textarea onChange={
                    (message) => {
                        setNewMessage(message.target.value)
                    }
                }>Type here...</textarea>

                <button onClick={() => {
                    if (sender != null) {
                        let control: any = corelink
                        control.send(
                            sender,
                            str2ab(
                                JSON.stringify({
                                    content: newMessage,
                                    sent: Date.now(),
                                    target: user
                                })
                            )
                        )
                        return
                    }

                    console.log("Sender does not exist! Could not send message.")
                }}>Click to send message!
                </button>
            </main>
        </div>
    )
}
