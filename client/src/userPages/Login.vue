<template>
    <div class="header">
        <div class="col-xs-12">
            <header>
                <img class="logo" src="../assets/logo.png" alt="S.O.S.ial" width="140" height="100">This is a header
                <div class="login">
                    <form>
                        Username: <input>
                        Password: <input>
                    </form>
                </div>
                <h1>This is a header</h1>
            </header>
        </div>
    </div>
</template>

<script>
</script>

<style>
.header{
    display: flexbox;
  background-color: #f1f1f1;
  padding: 20px 20px;
  color: black;
  /* text-align: center; */
  font-size: 10px;
  font-weight: bold;
  position: fixed; /* Fixed position - sit on top of the page */
  top: 0;
  width: 100%; /* Full width */
  transition: 0.2s;


}

.logo{
    align-items: left;
}
</style>