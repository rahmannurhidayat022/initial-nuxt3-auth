import { useMember } from "~/composables/useMember";

export default defineNuxtRouteMiddleware(async () => {
	const isMember = useMember();

	if (!isMember.value) return navigateTo({ path: "/login" });
});
