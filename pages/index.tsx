import Image from 'next/image';
import { useUser } from '../firebase/useUser';

export default function Home() {
	const { user, logout } = useUser();

	if (user) {
		return (
			<article className="prose text-center">
				<h2>{user.displayName}</h2>
				<h4>{user.email}</h4>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => logout()}
				>
					Log Out
				</button>
			</article>
		);
	} else
		return (
			<div>
				<p className="text-center">
					<a className="text-xl text-red-600" href="/auth">
						Log In
					</a>
				</p>

				<footer className="flex justify-center mt-2 pt-1 align-center w-full h-100 border-t border-solid border-gray-200">
					<a
						href="https://github.com/dsibinski/Budgety"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="h-4 space-y-2">
							<Image
								src="/GitHub-Mark-32px.png"
								alt="GitHub logo"
								width={32}
								height={32}
							/>
						</span>
					</a>
				</footer>
			</div>
		);
}
