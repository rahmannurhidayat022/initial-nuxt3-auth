import { useAuthUser } from "~/composables/useAuthUser";

export default defineNuxtRouteMiddleware(async () => {
	const user = useAuthUser();

	if (!user.value) return navigateTo({ path: "/login" });
});
