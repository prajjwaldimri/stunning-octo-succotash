<template>
   <header style="top: 0px">
        <div class="logo">
            <a href="#Home"><img class="icon1"  src="../assets/logo.png"></a>
        </div>
        <div class="profile">
            <a href="#Profile"><img class="icon2" src="../assets/profile.png"></a> 
        </div>
        <div class="log">
            <a href="#Home" class="box b1" >Home</a>
            <a href="#LogOut" class="box b1" >Log Out</a>
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
<<<<<<< HEAD
        align-items: center;
        position: fixed;
        height: 3em;
        width: 100%;
=======
        height:3em ;
        margin-bottom: 1%;
>>>>>>> 8749e7cfeefeaefaa00e67a8df765ad18911e3b9
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
    .log a{
        font-size:17px;
    }
    .icon1{
        height: 3em;
    }
    .icon2{
        height:2em;
    }
    .box{
        color: #049892;
        text-align: center;
        padding:.3em;
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