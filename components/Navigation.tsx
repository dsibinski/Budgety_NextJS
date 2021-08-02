import { Fragment } from 'react';
import { useAuthUser } from 'next-firebase-auth';

const navigation = [
	{ name: 'Home', href: '/', current: true },
	{ name: 'Operations', href: '/operations', current: false },
	{ name: 'Categories', href: '/categories', current: false },
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
	const AuthUser = useAuthUser();
	return <div></div>;
}
