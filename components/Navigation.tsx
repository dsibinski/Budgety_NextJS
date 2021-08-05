import React, { useState } from 'react';
import { useAuthUser } from 'next-firebase-auth';
import { Box, Heading, Flex, Button, Link } from '@chakra-ui/react';

type MenuLinkItemProps = {
	text: string;
	url: string;
};

const MenuLinkItem = (props: MenuLinkItemProps) => (
	<Link mt={{ base: 4, md: 0 }} mr={6} display="block" href={props.url}>
		{props.text}
	</Link>
);

const Navigation = () => {
	const [show, setShow] = useState(false);
	const handleToggle = () => setShow(!show);
	const AuthUser = useAuthUser();

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding="1.5rem"
			bg="gray.800"
			color="white"
		>
			<Flex align="center" mr={5}>
				<Heading
					title="Manage your finances in an easy way"
					as="h1"
					size="lg"
					letterSpacing={'-.1rem'}
				>
					Budgety
				</Heading>
			</Flex>

			<Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
				<svg
					fill="white"
					width="20px"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
				</svg>
			</Box>

			<Box
				display={{
					base: show ? 'block' : 'none',
					sm: show ? 'block' : 'none',
					md: 'flex',
				}}
				width={{ base: 'full', sm: 'full', md: 'auto' }}
				alignItems="center"
				flexGrow={1}
			>
				<MenuLinkItem text="Home" url="/" />
				<MenuLinkItem text="Categories" url="/categories" />
				<MenuLinkItem text="Operations" url="/operations" />
				{!!AuthUser?.id && (
					<Button
						bg="transparent"
						border="1px"
						mt={{ base: 3, md: 0 }}
						onClick={(e) => AuthUser.signOut()}
					>
						Logout
					</Button>
				)}
			</Box>
		</Flex>
	);
};

export default Navigation;
