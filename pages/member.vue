<script setup lang="ts">
definePageMeta({
	name: "MemberPage",
	middleware: ["member-only"],
});

const { logout } = useAuth();
const logoutHandler = async () => {
	await logout();
};
</script>

<template>
	<section>
		<h1>Member</h1>
		<button @click.stop="logoutHandler">Logout</button>
	</section>
</template>
