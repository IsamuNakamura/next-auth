import { Container, Text } from "@mantine/core";
import { Book } from "~/components/book";
import { getAllBooks } from "~/lib/microCMS/client";
import type { BookType } from "~/types/book";

export default async function Page() {
	const { contents: books } = await getAllBooks();

	return (
		<Container size="xl" className="flex flex-col">
			<Text fw={500} size="xl" my="md">
				Contents
			</Text>
			<Container size="xl" className="flex flex-row">
				{books.map((book: BookType) => (
					<Book key={book.id} book={book} />
				))}
			</Container>
		</Container>
	);
}
