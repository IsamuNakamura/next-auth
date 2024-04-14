import type { ReactNode } from "react";
import { ProductLayout } from "~/layouts/product";

export default function Layout({ children }: { children: ReactNode }) {
	return <ProductLayout>{children}</ProductLayout>;
}
