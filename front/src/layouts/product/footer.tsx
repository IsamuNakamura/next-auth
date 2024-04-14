"use client";

import { Anchor, Container, Group } from "@mantine/core";
import Image from "next/image";
import { useMediaQuery } from "~/lib/mantine/useMediaQuery";

const links = [
	{ link: "#", label: "Company" },
	{ link: "#", label: "Terms and Conditions" },
	{ link: "#", label: "Privacy Policy" },
	{ link: "#", label: "Inquiry" },
] as const;

export function Footer() {
	const matches = useMediaQuery("xs");

	return (
		<footer className="border-gray-200 border-t dark:border-dark-500">
			<Container
				fluid
				className={`flex items-center justify-between px-5 py-3${
					matches ? "flex-col" : ""
				}`}
			>
				<Image
					src="/vercel.svg"
					alt="Vercel Logo"
					className="dark:invert"
					width={100}
					height={24}
					priority={true}
				/>
				<Group className="">
					{links.map((link) => (
						<Anchor<"a"> c="dimmed" key={link.label} href={link.link} size="sm">
							{link.label}
						</Anchor>
					))}
				</Group>
			</Container>
			<Container className="pb-3 text-center">
				© *** Co., Ltd. All Rights Reserved.
			</Container>
		</footer>
	);
}
