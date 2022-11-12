<template>
  <div>
    <HeaderIn></HeaderIn>
    <div class="thanks">
      <div class="thanks_box">
        <h3 class="thanks_box_ttl">ご登録が完了しました。</h3>
        <p class="thanks_box_content">チャットID:</p>
        <p class="thanks_box_content_name">{{ this.$route.query.name }}</p>
        <p class="thanks_box_content">チャットパスワード:</p>
        <p class="thanks_box_content_name">{{ this.$route.query.password }}</p>
        <p class="thanks_box_content">上記の内容を一緒にご利用されたい方への共有をお願いします。</p>
        <br />
        <p class="thanks_box_btn" @click="join()">こちらより「{{ this.$route.query.name }}」患者チャットへ参加して下さい</p>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patient_id: "",
      name: "",
      password: "",
    };
  },
  methods: {
    // 患者チャットに patient_id をパラメータで持たせて遷移。次のページで2つのcommentsテーブルから検索
    async join() {
      this.patient_id = this.$route.query.patient_id,
      this.$router.push({ path: 'patient-chat' , query :{ patient_id: this.patient_id }});
    },
  },
  created() {
    // firebaseのログインチェック
    this.$store.dispatch('onAuth')
  }
}
</script>

<style>
.thanks{
  display: flex;
  justify-content: center;
}
.thanks_box{
  width: 600px;
  height: auto;
  text-align: center;
  border: 2px solid rgb(42, 171, 191);
  background-color: rgb(211, 252, 237);
  border-radius: 10px;
  padding: 50px;
}
.thanks_box_ttl{
  font-size: 30px;
  padding-bottom: 50px;
}
.thanks_box_content{
  margin-top: 10px;
  line-height:40px;
  font-size: 20px;
}
.thanks_box_content_name{
  line-height:40px;
  font-size: 30px;
  color: rgb(167, 0, 0);
}
.thanks_box_btn{
  margin-top: 10px;
  line-height:40px;
  font-size: 20px;
  color: rgb(0, 0, 238);
  text-decoration:underline;
  cursor: pointer;
}
.thanks_box_btn:hover {
  background-color: transparent;
  color: #a80000;
  cursor: pointer;
}
</style>