// const Header = () => {
// 	return (
// 		<div className="text-center">
// 			<span className="text-6xl font-bold">Budgety</span>
// 			<p className="pt-4 text-xl">Manage your finances in an easy way</p>
// 		</div>
// 	);
// };

// export default Header;

import { Box, Heading, Text } from '@chakra-ui/react';

const Header = () => {
	return (
		<Box textAlign="center" marginBottom={4}>
			<Heading size="4xl">Budgety</Heading>
			<Text fontSize="xl" paddingTop={4}>
				Manage your finances in an easy way
			</Text>
		</Box>
	);
};

export default Header;
