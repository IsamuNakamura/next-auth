"use client";

import {
	Box,
	Card,
	Container,
	Image,
	Text,
	TypographyStylesProvider,
} from "@mantine/core";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { useEffect, useState } from "react";
import { getDetailBook } from "~/lib/microCMS/client";
import type { BookType } from "~/types/book";

export default function DetailBook({ params }: { params: { id: string } }) {
	const [book, setBook] = useState<
		(BookType & MicroCMSContentId & MicroCMSDate) | null
	>(null);

	useEffect(() => {
		const fetchData = async () => {
			const bookData = await getDetailBook(params.id);
			setBook(bookData);
		};

		fetchData();
	}, [params]);

	if (!book) {
		return <div>Loading...</div>;
	}

	return (
		<Container size="sm" className="mx-auto p-4">
			<Card shadow="lg" radius="lg">
				<Image
					className="h-80 w-full object-cover object-center"
					src={book.thumbnail.url}
					alt={book.title}
					width={700}
					height={700}
				/>
				<Container className="p-4">
					<Text size="xl" fw={600}>
						{book.title}
					</Text>
					<TypographyStylesProvider>
						<div
							className="mt-2"
							dangerouslySetInnerHTML={{ __html: book.content }}
						/>
					</TypographyStylesProvider>
				</Container>
				<Box className="flex flex-col text-right">
					<Text size="sm" c="gray">
						公開日: {new Date(book.createdAt).toLocaleString()}
					</Text>
					<Text size="sm" c="gray">
						最終更新: {new Date(book.updatedAt).toLocaleString()}
					</Text>
				</Box>
			</Card>
		</Container>
	);
}
