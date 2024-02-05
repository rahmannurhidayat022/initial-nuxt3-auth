<script setup lang="ts">
definePageMeta({
	name: "DashboardPage",
	middleware: ["auth-only"],
});

const { logout } = useAuth();
const logoutHandler = async () => {
	await logout();
};
</script>

<template>
	<h1>Dashboard | General Auth Only</h1>
	<button @click.stop="logoutHandler">Logout</button>
</template>
