<template>
    <div class="container">
           <div class="post post-label">
               <label>Say Something:</label>
           </div>
           <div class="post post-body">
               <form class="body box" action="#">
                   <input type="text" placeholder="title"><br>
                   <textarea  placeholder="Text"></textarea><br>
                   <button>Post</button>
               </form>
           </div>
        </div>
</template>
<script>

</script>
<style scoped>
*{
    margin:0;
    padding:0;
}
.container{
    border: 1px solid #049892;
    border-radius: 6px;
    width:40%;
    margin-left: 30%;
    background-color: white;
    margin-bottom: .25%;
}
.post{
    border: 1px solid whitesmoke;
    color: #049892;
    margin-top: 7px;
    margin-bottom: 7px;
}
.box{
    margin-left:2%;
    
}
.post-label{
    margin-left:2%;
    
}
.box input{
    min-width:97% ;
    max-width:97% ;
}
.body input{
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 5px;
}
.box input{
    border: 1px #929292 solid;
    padding-left: 5px;
}
.body button{
    border: 1px #929292 solid;
    margin-top:5px;
    padding-top:3px;
    padding-bottom: 3px;
    padding-right:7px;
    padding-left:7px;
    color:#049892;
}
.body textarea{
    min-width: 97%;
    padding-left: 5px;
    max-width: 97%;
    min-height: 120px;
    border: 1px #929292 solid;
}
</style>>