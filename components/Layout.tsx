// import Navigation from './Navigation';
// import Meta from './Meta';
// import Header from './Header';

// const Layout = ({ children }: any) => {
// 	return (
// 		<>
// 			<Meta />
// 			<Navigation />
// 			<div className="flex flex-col mt-2 items-center justify-center h-full">
// 				<main className="flex flex-1 flex-col items-center justify-center space-y-4">
// 					<Header />
// 					{children}
// 				</main>
// 			</div>
// 		</>
// 	);
// };

// export default Layout;

import Navigation from './Navigation';
import Meta from './Meta';
import Header from './Header';
import { Box, Flex } from '@chakra-ui/layout';

const Layout = ({ children }: any) => {
	return (
		<Box>
			<Meta />
			<Navigation />
			<Flex
				direction="column"
				mt={2}
				alignItems="center"
				justifyContent="center"
				height="100%"
			>
				<Flex
					direction="column"
					flex="1 1 0%"
					alignItems="center"
					justifyContent="center"
				>
					<Header />
					{children}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Layout;
