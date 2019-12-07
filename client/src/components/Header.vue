<template>
   <header class="header">
        <div class="logo">
            <a href="#Home"><img class="icon1"  src="../assets/logo.png"></a>
        </div>
        <div class="profile">
            <a href="#Profile"><img class="icon2" src="../assets/profile.png"></a> 
        </div>
        <div class="log">
            <a href="#Sign_In" class="box b1" >Home</a>
            <a href="#Sign_In" class="box b1" >Sign In</a>
            <a href="#Sign_Op" class="box b2" >Sign Up</a>
        </div>
    </header>
</template>

<script>
</script>

<style>
*{
        margin: 0%;
        padding: 0%;
    }
    body{
    background-color:#dae0e6;
    }
    header{
        background-color: white;
        height:3em ;
        margin-bottom: 1%;
    }
    .logo{
        float: left;
        margin-left:2.5em ;
    }
    .profile{
        float: right;
        margin-top:.5em;
        margin-right:2.5em;
    }
    .log{
        float: right;
        margin-top: .75em;
        margin-right:1.5em;
    }
    .icon1{
        height: 3.5em;
    }
    .icon2{
        height:2em;
    }
    .box{
        color: #049892;
        text-align: center;
        padding:.5em;
        text-decoration: none;
        font-size: 18px; 
    }
    .log a:hover {
        background-color: #ddd;
    }
    @media screen and (max-width: 500px) {
        .header a{
            float:none;
            display: block;
            text-align: left;
        }
        .log{
        float:none;
        }
        .profile{
        float:none;
        }
        .logo{
        float:none;
        }
    }
</style>