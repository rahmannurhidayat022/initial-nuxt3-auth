import { useAuth } from "~/composables/useAuth";

export default defineNuxtPlugin(async (context) => {
	const { me } = useAuth();
	const name = context._route.name;

	// pada halaman verify/:token plugin ini dinonaktifkan
	if (name !== "verify-token") {
		await me();
	}
});
