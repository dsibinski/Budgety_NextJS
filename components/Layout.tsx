import Navigation from './Navigation';
import Meta from './Meta';
import Header from './Header';

const Layout = ({ children }: any) => {
	return (
		<>
			<Meta />
			<Navigation />
			<div className="flex flex-col mt-2 items-center justify-center h-full">
				<main className="flex flex-1 flex-col items-center justify-center space-y-4">
					<Header />
					{children}
				</main>
			</div>
		</>
	);
};

export default Layout;
