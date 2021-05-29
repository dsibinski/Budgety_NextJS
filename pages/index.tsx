import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Budgety</title>
				<meta
					name="description"
					content="Manage your finances in an easy way"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Budgety!</h1>
				<LoginModal></LoginModal>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://github.com/dsibinski/Budgety"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className={styles.logo}>
						<Image
							src="/GitHub-Mark-32px.png"
							alt="GitHub logo"
							width={32}
							height={32}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
}
