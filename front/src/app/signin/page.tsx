"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import type { BuiltInProviderType } from "next-auth/providers/index";
import {
	type ClientSafeProvider,
	type LiteralUnion,
	getProviders,
	signIn,
} from "next-auth/react";
import Image from "next/image";

type Provider = Record<
	LiteralUnion<BuiltInProviderType, string>,
	ClientSafeProvider
> | null;

export default async function LoginPage() {
	const providersData: Provider = await getProviders();
	if (!providersData) {
		return null;
	}
	const providers = Object.values(providersData);

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
