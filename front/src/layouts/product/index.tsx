import type { ReactNode } from "react";
import { Footer } from "~/layouts/product/footer";
import { Header } from "~/layouts/product/header";

export function ProductLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto]">
			<Header />
			<main className="my-3">{children}</main>
			<Footer />
		</div>
	);
}
