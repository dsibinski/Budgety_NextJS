import Navigation from './Navigation';
import Meta from './Meta';
import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }: any) => {
	return (
		<>
			<Meta />
			<Navigation />
			<div className={styles.container}>
				<main className={styles.main}>
					<Header />
					{children}
				</main>
			</div>
		</>
	);
};

export default Layout;
