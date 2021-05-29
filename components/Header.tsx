import headerStyles from '../styles/Header.module.css';

const Header = () => {
	return (
		<div>
			<h1 className={headerStyles.title}>
				<span>Budgety</span>
			</h1>
			<p className={headerStyles.description}>
				Manage your finances in an easy way
			</p>
		</div>
	);
};

export default Header;
