import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> on Akash!
        </h1>

        <p className={styles.description}>
          Start using the decentralized cloud today!
        </p>

        <div className={styles.grid}>
          <a href="https://github.com/OIGbash/nextjs-on-akash" className={styles.card}>
            <h3>Deploy your NextJS app on Akash &rarr;</h3>
            <p>Explore and follow in-depth deployment instructions.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://akash.network"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/akash.svg" alt="Akash Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
