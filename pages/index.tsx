import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';

export default function Home() {
	return (
		<Box>
			<Flex
				justifyContent="center"
				mt={2}
				pt={1}
				align="center"
				w="full"
				borderTop={1}
				borderStyle="solid"
				borderColor="gray.200"
			>
				<a
					href="https://github.com/dsibinski/Budgety"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/GitHub-Mark-32px.png"
						alt="GitHub logo"
						width={32}
						height={32}
					/>
				</a>
			</Flex>
		</Box>
	);
}
