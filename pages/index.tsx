import Image from 'next/image';

export default function Home() {
	return (
		<div>
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
