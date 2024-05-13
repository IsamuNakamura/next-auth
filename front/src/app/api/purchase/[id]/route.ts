import { NextResponse } from "next/server";
import prisma from "~/lib/prisma/prisma";

export async function GET(
	request: Request,
	{ params }: { params: { userId: string } },
) {
	const userId = params.userId;

	try {
		const purchases = await prisma.purchase.findMany({
			where: {
				userId: userId,
			},
		});

		return NextResponse.json(purchases);
	} catch (err: any) {
		return NextResponse.json(err.message);
	}
}
