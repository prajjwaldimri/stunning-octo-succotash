<template>
	<div class="login-form">
		<form v-on:submit.prevent="attemptLogin">
			<input v-model="uname" placeholder="username" required />
			<input v-model="password" placeholder="password" required />
			<button type="submit">Login</button>
		</form>
		<span class="err-msg">{{errMsg}}</span>
	</div>
</template>

<script>
import gql from "graphql-tag";

export default {
	data() {
		return {
			uname: "",
			password: "",
			errMsg: ""
		};
	},

	methods: {
		attemptLogin() {
			this.$apollo
				.query({
					query: gql`
          query {
            login(user: { username: "${this.uname}", password:"${this.password}" })
          }
        `
				})
				.then(response => {
					console.log(response.data.login);
					localStorage.setItem("token", response.data.login);
					this.$router.push("/home");
				})
				.catch(err => {
					console.log(err);
					this.errMsg = err;
				});
		}
	}
};
</script>
<style scoped>
.login-form {
	display: inline-block;
	padding: 5px;
}
input {
	margin: 5px;
}
.err-msg {
	font-size: 13px;
	padding: 0;
	margin-left: 5px;
	color: white;
}
</style>>
