<template>
    <div class="container">
        <div class="post post-label">
            <label>Post:</label>
        </div>
        <div class="post post-body">
            <form class="body box">
                <input type="text" placeholder="title"><br>
                <textarea placeholder="Text"></textarea><br>
            </form>
        </div>
        <div class="post post-comment">
            <form class="comment box">
                <input type="text" placeholder="comment">
            </form>
        </div>
    </div>
</template>
<script>
export default {
    
}
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
    border: 1px whitesmoke solid;
    padding-left: 5px;
}
.comment input{
    padding-top: 5px;
    padding-bottom: 5px;
}
.body textarea{
    min-width: 97%;
    min-height: 120px;
    padding-left: 5px;
    max-width: 97%;
    border: 1px whitesmoke solid;
}
</style>>