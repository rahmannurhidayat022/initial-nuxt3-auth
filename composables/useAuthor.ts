import { useAuthUser } from "./useAuthUser";

export const useAuthor = () => {
	const authUser = useAuthUser();

	return computed(() => {
		if (!authUser.value) return false;

		return authUser.value.id_role === 2;
	});
};
