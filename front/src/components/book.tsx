"use client";

import { Button, Card, Container, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { BookType } from "~/types/book";
import type { User } from "~/types/user";

type BookProps = {
	book: BookType;
	isPurchased: boolean;
};

export function Book({ book, isPurchased }: BookProps) {
	const { data: session } = useSession();
	const user: User = session?.user as User;
	const router = useRouter();
	const [opened, { open, close }] = useDisclosure(false);

	const startCheckout = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/checkout`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: book.title,
						price: book.price,
						bookId: book.id,
						userId: user?.id,
					}),
				},
			);

			const responseData = await response.json();
			if (responseData) {
				router.push(responseData.checkout_url);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleContentClick = () => {
		if (isPurchased) {
			alert("This book is already purchased");
			return;
		}
		open();
	};

	const handlePurchaseClick = () => {
		if (!user) {
			router.push("/signin");
			return;
		}

		startCheckout();
	};

	const handleCancelClick = () => {
		close();
	};

	return (
		<Container>
			<Container className="flex justify-evenly pt-4">
				<Card shadow="sm" component="button" onClick={handleContentClick}>
					<Card.Section>
						<Image
							priority
							src={book.thumbnail.url}
							alt={book.title}
							width={450}
							height={350}
							className="rounded-t-md"
						/>
					</Card.Section>

					<Text fw={500} size="lg" mt="md">
						{book.title}
					</Text>
					<Text fw={500} size="lg" mt="md">
						値段：{book.price}円
					</Text>
				</Card>
			</Container>
			<Modal
				opened={opened}
				onClose={close}
				title="メッセージ"
				centered
				size="xs"
			>
				<Container className="flex items-center justify-evenly">
					<Text size="sm">購入しますか？</Text>
				</Container>
				<Container className="flex h-14 items-center justify-evenly pt-4">
					<Button onClick={handlePurchaseClick}>購入</Button>
					<Button color="gray" onClick={handleCancelClick}>
						キャンセル
					</Button>
				</Container>
			</Modal>
		</Container>
	);
}
