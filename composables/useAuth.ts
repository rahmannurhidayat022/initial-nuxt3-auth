import { useCookie, useRuntimeConfig } from "#imports";
import type { RequestResponse } from "~/types";
import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
	const config: any = useRuntimeConfig();
	const credential = useCookie(
		config.public.cookieName,
		config.public.cookieOptions
	);
	const authUser = useAuthUser();

	const setUser = (user: any) => {
		authUser.value = user;
	};

	const setCookie = (token: any) => {
		credential.value = token;
	};

	const getToken = (): string => {
		return `Bearer ${credential.value}`;
	};

	const login = async (email: string, password: string) => {
		try {
			const loginToken: RequestResponse = await $fetch("/app/login");
			const res: RequestResponse = await $fetch("/app/login", {
				method: "POST",
				body: { email, password, token: loginToken.data.token },
			});
			if (res.success) {
				credential.value = res.data.token;
				const user = await me();
				if (user && user.id_role === 1) navigateTo({ path: "/member" });
				if (user && user.id_role === 2) navigateTo({ path: "/author" });
				if (user && user.id_role === 3) navigateTo({ path: "/admin" });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async () => {
		try {
			const res: RequestResponse = await $fetch("/app/logout", {
				headers: {
					Authorization: getToken(),
				},
			});
			if (res.success) {
				setCookie(null);
				setUser(null);
				navigateTo({ path: "/login" });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const verify = async (token: string) => {
		try {
			const res: RequestResponse = await $fetch(`/app/verify/${token}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setCookie(res.data.token);
			await me();
			return true;
		} catch (error) {
			return false;
		}
	};

	const me = async () => {
		if (!authUser.value) {
			try {
				const res: RequestResponse = await $fetch("/app/users", {
					headers: {
						Authorization: getToken(),
					},
				});
				setUser(res.data);
				return res.data;
			} catch (error) {
				setCookie(null);
			}
		}
	};

	return { getToken, verify, login, logout, me };
};
