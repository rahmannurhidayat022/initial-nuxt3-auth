import { useAdmin } from "~/composables/useAdmin";

export default defineNuxtRouteMiddleware(async () => {
	const isAdmin = useAdmin();

	if (!isAdmin.value) return navigateTo({ path: "/login" });
});
