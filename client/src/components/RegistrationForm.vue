<template>
	<div class="reg-form">
		<h3>Register Here</h3>
		<form v-on:submit.prevent="createUser">
			<label>Username:</label>
			<input v-model="uname" type="text" placeholder="Username" required />
			<br />
			<label>Password:</label>
			<input v-model="password" type="password" placeholder="Your password" required />
			<br />
			<label>Confirm Password:</label>
			<input v-model="cnfPassword" type="password" placeholder="Confirm password" required />
			<br />
			<p class="err-msg">{{ errMsg }}</p>
			<button type="submit">Sign UP</button>
		</form>
	</div>
</template>

<script>
import gql from "graphql-tag";

export default {
	data() {
		return {
			uname: "",
			password: "",
			cnfPassword: "",
			errMsg: ""
		};
	},

	methods: {
		createUser() {
			// Mutation
			this.$apollo
				.mutate({
					mutation: gql`
            mutation {
                createAccount(user: { username: "${this.uname}", password: "${this.password}" }){
                username
                }
            }
            `
				})
				.then(data => {
					console.log("Done", data);
					alert(this.uname + " Created");
					this.login();
				})
				.catch(err => {
					this.errMsg = err;
				});
		},

		login() {
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
.reg-form {
	/* display: flex;
	flex-direction: column;
	padding: 50px;
	border: #009a96 solid 1px;
	border-radius: 6px;
	flex-basis: 60%; */
}

h3 {
	padding: 10px;
}
label {
	padding: 5px;
}
.reg-form input {
	width: 100%;
	margin-top: 5px;
	margin-bottom: 5px;
}

button {
	color: #009a96;
}

.reg-form button {
	margin-top: 15px;
}

.err-msg {
	font-size: 13px;
	padding: 0;
	margin-left: 5px;
	color: white;
}
</style>
