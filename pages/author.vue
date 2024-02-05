<script setup lang="ts">
definePageMeta({
	name: "AuthorPage",
	middleware: ["author-only"],
});

const { logout } = useAuth();
const logoutHandler = async () => {
	await logout();
};
</script>

<template>
	<section>
		<h1>Author</h1>
		<button @click.stop="logoutHandler">Logout</button>
	</section>
</template>
