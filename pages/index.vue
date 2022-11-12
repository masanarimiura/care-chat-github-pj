<template>
  <div>
    <HeaderOut></HeaderOut>
    <div class="login-register_ttl">
      <h2>Care Chat </h2>
      <h2>アカウントページ</h2>
      <p>※「患者チャット」を利用するにはまず、ご本人様の<NuxtLink to="/register-client">「クライアントアカウント」</NuxtLink>もしくは,<NuxtLink to="/register-worker">「ケアワーカーアカウント」</NuxtLink>の作成が必要です。</p>
      <p>※患者様ご本人様も<NuxtLink to="/register-client">「クライアントアカウント」</NuxtLink>の作成が必要になります。</p>
    </div>
    <div class="login-register">
      <div class="login">
        <div class="login_box">
          <h3 class="login_box_ttl">ログイン</h3>
          <p class="login_box_content">※ログイン後にチャットIDの作成、チャット参加が可能となります。</p>
          <p class="login_box_content">※チャットIDとチャットパスワードのみではログインできません。ご自身のアカウントを新規作成してからログインして下さい。</p>
          <br />
          <p class="login_box_input_ttl">メールアドレス</p>
          <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="{ errors }" rules="required|email|max:256">
              <input v-model="email" type="email" name="メールアドレス" required placeholder="メールアドレス" />
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <br />
            <p class="login_box_input_ttl">パスワード</p>
            <validation-provider v-slot="{ errors }" rules="required|min:6|max:256|alpha_dash">
              <input v-model="password" type="password" name="パスワード" required placeholder="パスワード" />
              <br />
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <button @click="login()" class="login__btn" 
            :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
          </validation-observer>
        </div>
      </div>
      <div class="register">
        <div class="register_box">
          <h3 class="register_box_ttl">新規登録</h3>
          <p class="register_box_content">※アカウント作成しログイン後にチャットID作成、ログインが可能となります。</p>
          <br />
          <NuxtLink to="/register-client" class="nuxt-link">クライアントとして新規登録</NuxtLink>
          <p class="register_box_content">※患者様ご本人・ご家族様等はこちらより作成をお願いします。</p>
          <br />
          <NuxtLink to="/register-worker" class="nuxt-link">ケアワーカーとして新規登録</NuxtLink>
          <p class="register_box_content">※医療福祉従事者の方はこちらより作成をお願いします。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    // firebaseにログイン情報を送信するためにstore/index.jsのVuexにthis.$store.dispatch()で情報送信
    async login() {
      const userData = {
        email: this.email,
        password: this.password,
      }
      await this.$store.dispatch('login', userData);
      this.$router.replace('/patient-index');
    },
  }
}
</script>

<style>
.login-register_ttl {
  margin: auto;
  width: 500px;
  height: auto;
  text-align: center;
}
.login-register_ttl h2 {
  font-size: 50px;
}
.login-register_ttl p {
  margin-top: 10px;
  text-align: left;
  font-size: 14px;
}
.login-register{
  margin: 10px 50px 0 50px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.login,.register{
  margin: 20px;
  display: flex;
  justify-content: center;
}
.login_box,.register_box{
  width: 400px;
  height: auto;
  text-align: center;
  border: 2px solid rgb(42, 171, 191);
  background-color: rgb(233, 245, 255);
  border-radius: 10px;
  padding: 50px;
}
.login_box_ttl,.register_box_ttl{
  font-size: 30px;
}
.register_box_content,.login_box_content{
  margin-top: 10px;
  font-size: 12px;
}
.login_box_input_ttl{
  font-size: 20px;
}
.login_box input{
  margin: 10px;
  width: 400px;
  height: 30px;
  border: 2px solid rgb(42, 171, 191);
  border-radius: 10px;
}
.login__btn {
  margin: 20px;
  width: 100px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: rgb(42, 171, 191);
  color: #fff;
  border: 1px solid rgb(28, 117, 131);
  cursor: pointer;
}
.register_box{
  background-color: rgb(211, 252, 237);
}
.register_box .nuxt-link {
  margin-top: 20px;
  display: inline-block;
  text-decoration: none;
  font-size: 20px;
  color: rgb(42, 171, 191);
  border-radius: 10px;
  padding: 20px 20px;
  background: rgb(42, 171, 191);
  color: #fff;
  border: 1px solid rgb(28, 117, 131);
  cursor: pointer;
}
</style>