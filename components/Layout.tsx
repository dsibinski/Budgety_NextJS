import Navigation from './Navigation';
import Meta from './Meta';
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
					{children}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Layout;
