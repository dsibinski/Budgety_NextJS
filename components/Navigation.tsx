import Link from 'next/link';
import navigationStyles from '../styles/Navigation.module.css';

const Navigation = () => {
	return (
		<nav className={navigationStyles.nav}>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/login">Login</Link>
				</li>
				<li>
					<Link href="/register">Register</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
