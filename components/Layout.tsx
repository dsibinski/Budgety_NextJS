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
				m={2}
				alignItems="center"
				justifyContent="center"
				height="100%"
				width="full"
			>
				<Flex
					direction="column"
					flex="1 1 0%"
					alignItems="center"
					justifyContent="center"
					width="full"
				>
					{children}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Layout;
