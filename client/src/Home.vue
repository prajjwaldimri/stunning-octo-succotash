<template>
	<div class="container">
		<div class="header">
			<div class="center">
				<div class="logo-box">
					<img src="./assets/logo.png" alt="S.O.S.ial" class="logo" />
				</div>
				<div class="login">
					<login-form></login-form>
				</div>
			</div>
		</div>
		<div class="main-content">
			<div class="about">
				<span class="about-header">S.O.S.ial</span>
				<span
					class="about-content"
				>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque eum error, laborum fugit omnis odit sint perferendis, consequuntur corrupti itaque quia consequatur inventore officia iusto commodi labore porro doloribus veritatis.</span>
			</div>
			<div class="reg">
				<reg-form></reg-form>
			</div>
		</div>
	</div>
</template>

<script>
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
export default {
	components: {
		"login-form": LoginForm,
		"reg-form": RegistrationForm
	}
};
</script>

<style>
.container {
	/* display: flex;
	flex-flow: row wrap; */
	background: linear-gradient(
		to right bottom,
		rgba(0, 0, 255, 0.815),
		rgba(128, 0, 128, 0.808)
	);
	color: whitesmoke;
	width: 100%;
	height: 100vh;
}
.container > * {
	float: 1 100%;
}
.header {
	/* width: 100%; */
}
.center {
	max-width: 70%;
	margin: 0 auto;
	border-bottom: #beb3b3 solid 1.2px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.logo-box {
	/* display: inline-block; */
	/* background: url("./assets/logo.png"); */
	/* background-size: 100px 70px;
	width: 100px;
	height: 70px; */
}
.logo {
	height: 85px;
}
.login {
	margin: 0 0 0 auto;
}
.main-content {
	display: grid;
	max-width: 65%;
	margin: 0 auto;
	grid-template-columns: auto auto;
	align-items: center;
	justify-content: center;
	padding: 5% 0;
}
.about {
	padding: 20px 10%;
}
.about-header {
	display: block;
	font-size: 80px;
	font-weight: 600;
	letter-spacing: 7px;
	/* padding: 20px 20%; */
}

/* Medium screens */
@media all and (min-width: 600px) {
	/* We tell both sidebars to share a row */
	.aside {
		flex: 1 auto;
	}
}

/* Large screens */
@media all and (min-width: 800px) {
	/* We invert order of first sidebar and main
   * And tell the main element to take twice as much width as the other two sidebars 
   */
	.main {
		flex: 2 0px;
	}
	.aside-1 {
		order: 1;
	}
	.main {
		order: 2;
	}
	.aside-2 {
		order: 3;
	}
	.footer {
		order: 4;
	}
}
</style>
