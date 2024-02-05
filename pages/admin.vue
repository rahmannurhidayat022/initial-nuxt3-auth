<script setup lang="ts">
definePageMeta({
	name: "AdminPage",
	middleware: ["admin-only"],
});

const { logout } = useAuth();
const logoutHandler = async () => {
	await logout();
};
</script>

<template>
	<h1>Admin</h1>
	<button @click.stop="logoutHandler">Logout</button>
</template>
