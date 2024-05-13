import { Container, Text } from "@mantine/core";
import { getServerSession } from "next-auth";
import { Book } from "~/components/book";
import { getAllBooks } from "~/lib/microCMS/client";
import { authOptions } from "~/lib/nextAuth/options";
import type { BookType } from "~/types/book";
import type { Purchase } from "~/types/purchase";
import type { User } from "~/types/user";

export default async function Page() {
	const { contents: books } = await getAllBooks();
	const session = await getServerSession(authOptions);
	const user: User = session?.user as User;

	let purchaseBookIds: string[] = [];
	if (user) {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/purchase/${user.id}`,
			{ cache: "no-store" },
		);
		const purchases = await response.json();
		purchaseBookIds = purchases.map((purchase: Purchase) => purchase.bookId);
	}

	const isPurchased = (bookId: string) => {
		return purchaseBookIds.includes(bookId);
	};

	return (
		<Container size="xl" className="flex flex-col">
			<Text fw={500} size="xl" my="md">
				Contents
			</Text>
			<Container size="xl" className="flex flex-row">
				{books.map((book: BookType) => (
					<Book key={book.id} book={book} isPurchased={isPurchased(book.id)} />
				))}
			</Container>
		</Container>
	);
}
