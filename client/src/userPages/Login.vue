<template>
    <div>
        <div class="header">
            <div class="logo">
                <img src="../assets/logo.png" alt="S.O.S.ial" width="140" height="90">
            </div>
            <div class="login">
                <form class="login-form">
                    <input placeholder="username">
                    <input placeholder="password">
                    <button>Login</button>
                </form>
            </div>
        </div>

        <div class="main-container">
            <div class="about-sidebar">
                <div class="about-text">
                    <p>What is Lorem Ipsum?<br>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    <p>Why do we use it?<br>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </p>
                </div>
            </div>
            <div class="reg-form-container">
                <div class="reg-form">
                    <h3>Register Here</h3>
                    <form>
                        <label>Email: </label><input type="text" placeholder="Enter email here"><br>
                        <label>Password: </label><input type="password" placeholder="Your password"><br>
                        <label>Confirm Password: </label><input type="password" placeholder="Reenter password"><br>
                        <button>Sign UP</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style>
.header {
    display: flex;
    background-color: #f1f1f1;
    /* padding: 20px 20px; */
    color: black;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
    position: fixed; /* Fixed position - sit on top of the page */
    /* top: 0; */
    width: 100%; /* Full width*/
    transition: 0.2s;
    border-bottom: cadetblue solid 1px;

}

.main-container {
    padding-top: 93px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* .logo{
    background-image: url('../assets/logo.png');
    display: inline;
    
} */

.login{
    /* flex-grow: 10; */
    margin-left: auto;
    margin-right: 10px;
    text-align: center;
}

.login-form {
    height: 100%;
}

.about-sidebar {
    flex-basis: 60%;
}

.reg-form-container {
    flex-basis: 40%;
    align-items: center;
    margin: 50px;
}
.reg-form {
    display: flex;
    flex-direction: column;
    padding: 50px;
    border: #009a96 solid 1px;
    border-radius: 6px;
    flex-basis: 60%;
}

.login-form input {
    margin-right: 5px;
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

.about-text {
    margin: 15% 10%;
    background-color: #eef6f5;
}

.about-text p {
    padding: 20px;
    text-align: justify;
}
</style>