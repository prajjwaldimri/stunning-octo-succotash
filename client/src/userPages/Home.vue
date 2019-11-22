<template>
<div>
     <div class="container">
        <app-header></app-header>
        <hr><!--Horizontal Line after the Header> <!-->
        <section class="my_account_area pt--80 pb--55 bg--white" id="login">
          <div class="container">
              <div class="row">
                  <div class="col-lg-6 col-12">
                      <div class="my__account__wrapper">
                          <h3 class="account__title" id="acc">Login</h3>
                          <form action="#">
                              <div class="account__form">
                                  <div class="input__box">
                                      <label id="acc">Username or email address <span>*</span></label>
                                      <input type="text">
                                  </div>
                                  <div class="input__box">
                                      <label id="acc">Password<span>*</span></label>
                                      <input type="text">
                                  </div>
                                  <div class="form__btn">
                                      <button>Login</button>
                                      <label class="label-for-checkbox">
                                          <input id="rememberme" class="input-checkbox" name="rememberme" value="forever" type="checkbox">
                                          <span id="acc">Remember me</span>
                                      </label>
                                  </div>
                                  <a class="forget_pass" href="#" id="acc">Lost your password?</a>
                              </div>
                          </form>
                      </div>
                  </div>
                  <div class="col-lg-6 col-12">
                      <div class="my__account__wrapper">
                          <h3 class="account__title" id="acc">Register</h3>
                          <form action="#">
                              <div class="account__form">
                                  <div class="input__box">
                                      <label id="acc">Username <span>*</span></label>
                                      <input type="text">
                                  </div>
                                  <div class="input__box">
                                      <label id="acc">Password<span>*</span></label>
                                      <input type="password">
                                  </div>
                                  <div class="input__box">
                                      <label id="acc">Confirm Password<span>*</span></label>
                                      <input type="text">
                                  </div>
                                  <div class="input__box">
                                      <label id="acc">Email address <span>*</span></label>
                                      <input type="email">
                                  </div>
                                  <div class="input__box">
                                      <label id="acc">Mobile No. <span>*</span></label>
                                      <input type="text">
                                  </div>
                                  
                                  
                                  <div class="form__btn">
                                      <button id="acc">Register</button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </section>

        <app-footer></app-footer>
    </div>
</div>


</template>

<script>
    import Header from '../components/Header';
    import Footer from '../components/Footer';
export default {

  components: {
    'app-header': Header,
    'app-footer': Footer

  }
}
</script>

<style >

</style>
