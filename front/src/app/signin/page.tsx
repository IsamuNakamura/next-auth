"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Provider = {
	callbackUrl: string;
	id: string;
	name: string;
	signinUrl: string;
	type: string;
};

export default function LoginPage() {
	const [providers, setProviders] = useState<Provider[]>([]);

	useEffect(() => {
		const fetchProviders = async () => {
			const providersData = await getProviders();

			providersData && setProviders(Object.values(providersData));
		};

		fetchProviders();
	}, []);

	const handleClickSignIn = (providerId: string) => {
		signIn(providerId, { callbackUrl: "/" });
	};

	return (
		<Container className="flex min-h-screen flex-col items-center justify-center">
			<Title className="mb-3" order={1}>
				Login
			</Title>
			<Group className="flex flex-col items-center" mt="xl">
				{providers.map((provider) => (
					<Button
						key={provider.id}
						className="my-3"
						leftSection={
							<Image
								src={`/${provider.id}.svg`}
								alt={provider.id}
								className=""
								width={22}
								height={22}
							/>
						}
						variant="outline"
						onClick={() => handleClickSignIn(provider.id)}
					>
						Sign in with {provider.name}
					</Button>
				))}
			</Group>
			<Text className="my-5">Github or Google account is required</Text>
		</Container>
	);
}
