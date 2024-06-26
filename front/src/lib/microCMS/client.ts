import { createClient } from "microcms-js-sdk";
import type { BookType } from "~/types/book";

export const client = createClient({
	serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
	apiKey: process.env.NEXT_PUBLIC_SERVICE_API_KEY!,
});

export const getAllBooks = async () => {
	const allBooks = await client.get({ endpoint: "book-bazaar" });
	return allBooks;
};

export const getDetailBook = async (bookId: string) => {
	const detailBook = await client.getListDetail<BookType>({
		endpoint: "book-bazaar",
		contentId: bookId,
	});
	return detailBook;
};
