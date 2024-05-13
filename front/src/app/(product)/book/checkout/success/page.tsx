"use client";

import { Button, Container, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PurchaseSuccess() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");

	const [bookId, setBookId] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			if (sessionId) {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/checkout/success`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ sessionid: sessionId }),
						},
					);

					const data = await response.json();
					setBookId(data.purchase.bookId);
				} catch (error) {
					console.error("Error:", error);
				}
			}
		};

		fetchData();
	}, [sessionId]);

	return (
		<Container size="sm" className="mt-20 flex items-center justify-center">
			<Paper
				shadow="lg"
				withBorder
				radius="md"
				className="rounded-lg bg-white p-6 shadow-lg"
			>
				<Title
					order={1}
					className="mb-4 content-center font-bold text-2xl text-gray-800"
				>
					ご購入ありがとうございます！
				</Title>
				<Text c="dimmed" className="content-center text-gray-600">
					ご購入いただいた内容の詳細は、登録されたメールアドレスに送信されます。
				</Text>
				<div className="mt-6 text-center">
					<Link href={`/book/${bookId}`} passHref>
						<Button
							variant="outline"
							c="indigo"
							className="transition duration-300 hover:bg-indigo-50"
						>
							購入した記事を読む
						</Button>
					</Link>
				</div>
			</Paper>
		</Container>
	);
}
