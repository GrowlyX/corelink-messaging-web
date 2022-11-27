import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {corelink} from "../corelink.browser.lib";
import {datatype, protocol, workspace} from "../../constants/constants";

export default function User() {
    const [messages, setMessages] = useState<string[]>([])
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
            .then((res: any) => {
                setSender(res)

                control
                    .createReceiver({
                        workspace, protocol,
                        type: datatype,
                        echo: true, alert: true
                    })
                    .then(() => {
                        control.on('receiver', async (data: { streamID: any; }) => {
                            const options = { streamIDs: [data.streamID] }
                            await control.subscribe(options)
                        })

                        control.on('data', (streamID: any, data: { toString: () => any; }, header: any) => {
                            if (header.username !== user) {
                                return
                            }

                            messages.push(data.toString()) // TODO(subham): does push refresh page?
                            setMessages(messages)

                            console.log(streamID, data.toString(), JSON.stringify(header))
                        })

                        setLoading(false)
                    }, (err: any) => {
                        console.log("Error while creating RECEIVER = " + err)
                    })
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
                {messages.map((message) => (
                    // eslint-disable-next-line react/jsx-key
                    <p>{message}</p>
                ))}

                <textarea onChange={
                    (message) => {
                        setNewMessage(message.target.value)
                    }
                }>Type here...</textarea>

                <button onClick={() => {
                    if (sender != null) {
                        let control: any = corelink
                        control.send(
                            sender, Buffer.from(newMessage)
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
