import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Budgety!</h1>
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
