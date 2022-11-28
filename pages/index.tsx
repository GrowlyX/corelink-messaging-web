import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from "./partials/Navbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Corelink Messaging</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to Corelink Messaging
        </h1>

        <p className={styles.description}>
          Click the buttons below to enter a page:
        </p>

        <div className={styles.grid}>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/login" className={styles.card}>
            <h2>Log In &rarr;</h2>
            <p>Login to your Corelink server using existing credentials.</p>
          </a>

          <a href="/sign-up" className={styles.card}>
            <h2>Sign Up &rarr;</h2>
            <p>Create an account and start messaging.</p>
          </a>
        </div>
      </main>
    </div>
  )
}
