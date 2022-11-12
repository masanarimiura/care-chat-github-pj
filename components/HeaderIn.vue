<template>
  <div class="header-in">
    <div class="header-in_logo">
      <NuxtLink to="/patient-index" class="nuxt-link">
        <img src="../img/logo.png" class="header-in_img">
        <div class="header-in_ttl">
          <h2>Care</h2>
          <h2>Chat</h2>
        </div>
      </NuxtLink>
    </div>
    <div class="header-in_logout" @click="logout()">
      <img src="../img/logout.png">
      <p>ログアウト</p>
    </div>
    <div class="header-in_logout" @click="loginId()">
      <img src="../img/logout.png">
      <p>ログインIDチェック</p>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('logout')
          this.$router.replace('/')
        })
    },
    loginId() {
      console.log(this.$store.state.loginUserId)
      console.log(this.$store.state.userUid)
      console.log(this.$store.state.loggedIn)
      console.log(this.$store.state.clientOrWorker)
      }
  }
}
</script>

<style>
.header-in {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-right: 10px;
}
.header-in_logo {
  padding-top: 10px;
  padding-left: 10px;
}
.header-in_logo .nuxt-link {
  text-decoration: none;
  display: flex;
}
.header-in_img {
  display: block;
  width: auto;
  height: 60px;
}
.header-in_ttl {
  font-size: 30px;
  padding-top: 0px;
  padding-left: 5px;
  display: inline-block;
  color: rgb(42, 171, 191);
}
.header-in_logout {
  position: relative;
  cursor: pointer;
}
.header-in_logout img {
  position: absolute;
  right:100px;
  top:30px;
  display: inline-block;
  width: 30px;
  height: auto;
}
.header-in_logout p {
  position: absolute;
  width: 100px;
  right:0px;
  top:35px;
  display: inline-block;
  font-weight: bold;
}

</style>