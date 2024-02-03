// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL,
			cookieName: "__session_",
			cookieOptions: {
				maxAge: 172800,
				sameSite: "lax",
			},
		},
	},
	app: {
		buildAssetsDir: "__app_name_",
	},
	css: ["~/assets/css/main.css"],
	nitro: {
		routeRules: {
			"/app/**": {
				proxy: {
					to: process.env.API_HOST + "/**",
				},
			},
		},
	},
});
