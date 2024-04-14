import {
	type UseMediaQueryOptions,
	useMediaQuery as useMediaQueryOriginal,
} from "@mantine/hooks";

/* Mantineと一致させる: https://mantine.dev/styles/responsive/#configure-breakpoints */
const map = {
	xs: "576px",
	sm: "768px",
	md: "992px",
	lg: "1200px",
	xl: "1400px",
} as const;

export const useMediaQuery = (
	query: keyof typeof map,
	initialValue = true,
	options: UseMediaQueryOptions = { getInitialValueInEffect: initialValue },
) => {
	return useMediaQueryOriginal(
		`(max-width: ${map[query]})`,
		initialValue,
		options,
	);
};
