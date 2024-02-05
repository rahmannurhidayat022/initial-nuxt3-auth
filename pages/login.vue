<script setup lang="ts">
import { reactive } from "vue";
import type { FormLogin } from "~/types";

definePageMeta({
	name: "LoginPage",
	middleware: ["guest-only"],
});

const { login } = useAuth();
const form = reactive<FormLogin>({
	email: "",
	password: "",
});

const onSubmit = async (): Promise<void> => {
	await login(form.email, form.password);
};
</script>

<template>
	<section>
		<h1>Login</h1>
		<form @submit.prevent="onSubmit">
			<label>Email</label>
			<input v-model="form.email" type="email" /><br />
			<label>Password</label>
			<input v-model="form.password" type="password" />
			<button type="submit">Masuk</button>
		</form>
	</section>
</template>
