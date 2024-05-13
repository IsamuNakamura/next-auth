import { NextResponse } from "next/server";
import prisma from "~/lib/prisma/prisma";
import { stripe } from "~/lib/stripe/client";

export async function POST(request: Request, response: Response) {
	const { sessionid } = await request.json();

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionid);

		const isExistPurchase = await prisma.purchase.findFirst({
			where: {
				userId: session.client_reference_id!,
				bookId: session.metadata?.bookId!,
			},
		});

		if (!isExistPurchase) {
			const purchase = await prisma.purchase.create({
				data: {
					userId: session.client_reference_id!,
					bookId: session.metadata?.bookId!,
				},
			});
			return NextResponse.json({ purchase });
		}

		return NextResponse.json({ message: "This book is already purchased" });
	} catch (err: any) {
		return NextResponse.json(err.message);
	}
}
