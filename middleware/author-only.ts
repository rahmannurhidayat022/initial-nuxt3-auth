import { useAuthor } from "~/composables/useAuthor";

export default defineNuxtRouteMiddleware(async () => {
	const isAuthor = useAuthor();

	if (!isAuthor.value) return navigateTo({ path: "/login" });
});
