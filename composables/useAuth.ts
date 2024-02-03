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
			const res: RequestResponse = await $fetch("/app/auth/login", {
				method: "POST",
				body: { email, password },
			});
			if (res.success) {
				credential.value = res.data.token;
				await me();
				navigateTo({ path: "/dashboard" });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async () => {
		try {
			const res: RequestResponse = await $fetch("/app/auth/logout", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
			if (res.success) {
				setCookie(null);
				navigateTo({ path: "/login" });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const verify = async (token: string) => {
		try {
			const res: RequestResponse = await $fetch(`/app/auth/verify/${token}`, {
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

	const me = async (): Promise<void> => {
		if (!authUser.value) {
			try {
				const res: RequestResponse = await $fetch("/cda/api/users", {
					headers: {
						Authorization: getToken(),
					},
				});
				setUser(res.data);
			} catch (error) {
				setCookie(null);
			}
		}
	};

	return { getToken, verify, login, logout, me };
};
