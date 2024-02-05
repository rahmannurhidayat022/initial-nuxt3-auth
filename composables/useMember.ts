import { useAuthUser } from "./useAuthUser";

export const useMember = () => {
	const authUser = useAuthUser();

	return computed(() => {
		if (!authUser.value) return false;

		return authUser.value.id_role === 1;
	});
};
