"use client";

import { Button, Container, Group } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ActiveButton } from "~/components/activeButton";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/pricing", label: "Pricing" },
];

export function Header() {
	const { data } = useSession();
	const user = data?.user;

	return (
		<header className="h-14 border-gray-300 border-b dark:border-dark-400">
			<Container fluid className="flex h-14 items-center justify-between px-5">
				<Group gap={40}>
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						className="dark:invert"
						width={100}
						height={24}
						priority={true}
					/>
					<Group component="nav" gap={8}>
						{links.map((link) => (
							<ActiveButton key={link.label} href={link.href}>
								{link.label}
							</ActiveButton>
						))}
					</Group>
				</Group>

				<Group>
					{user ? (
						<Button onClick={() => signOut({ callbackUrl: "/signin" })}>
							Logout
						</Button>
					) : (
						<Button component={Link} href="/signin">
							Login
						</Button>
					)}
					<Image
						width={50}
						height={50}
						alt="profile_icon"
						src={user?.image || "/default_profile.png"}
					/>
				</Group>
			</Container>
		</header>
	);
}
