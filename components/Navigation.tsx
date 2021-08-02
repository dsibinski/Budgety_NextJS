// import { Fragment } from 'react';
// import { useAuthUser } from 'next-firebase-auth';

// const navigation = [
// 	{ name: 'Home', href: '/', current: true },
// 	{ name: 'Operations', href: '/operations', current: false },
// 	{ name: 'Categories', href: '/categories', current: false },
// ];

// function classNames(...classes: any[]) {
// 	return classes.filter(Boolean).join(' ');
// }

// export default function Navigation() {
// 	const AuthUser = useAuthUser();
// 	return <div></div>;
// }

import React from 'react';
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
	const [show, setShow] = React.useState(false);
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
				<Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
					Budgety
				</Heading>
			</Flex>

			<Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
				<svg
					fill="white"
					width="12px"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
				</svg>
			</Box>

			<Box
				display={{ sm: show ? 'block' : 'none', md: 'flex' }}
				width={{ sm: 'full', md: 'auto' }}
				alignItems="center"
				flexGrow={1}
			>
				<MenuLinkItem text="Home" url="/" />
				<MenuLinkItem text="Categories" url="/categories" />
				<MenuLinkItem text="Operations" url="/operations" />
			</Box>

			<Box
				display={{ sm: show ? 'block' : 'none', md: 'block' }}
				mt={{ base: 4, md: 0 }}
			>
				{!!AuthUser?.id && (
					<Button
						bg="transparent"
						border="1px"
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
