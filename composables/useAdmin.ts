import { useAuthUser } from "./useAuthUser";

export const useAdmin = () => {
	const authUser = useAuthUser();

	return computed(() => {
		if (!authUser.value) return false;

		// asumsi value 4 adalah id role untuk admin
		return authUser.value.id_role === 4;
	});
};
