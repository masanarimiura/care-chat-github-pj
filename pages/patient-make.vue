<template>
  <div>
    <HeaderIn></HeaderIn>
    <div class="patient-make">
      <div class="patient-make_box">
        <h3 class="patient-make_box_ttl">患者チャット新規作成</h3>
        <p class="patient-make_box_content">※既に作成済みのチャットに参加を希望する場合は作成者と「チャットID」「パスワード」を共有し、<NuxtLink to="/patient">「チャットに参加」</NuxtLink>を利用して下さい。</p>
        <br />
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="{ errors }" rules="required|max:100">
            <p class="patient-make_box_input_ttl">チャットID</p>
            <p class="patient-make_box_input_content">※患者様のお名前などで自由に作成して下さい。</p>
            <p class="patient-make_box_input_content">※20字以内の入力をお願いします。</p>
            <input v-model="name" type="text" name="チャットID" required placeholder="チャットID" />
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <br />
          <validation-provider v-slot="{ errors }" vid="passwordConfirm" rules="required|min:6|max:256">
            <p class="patient-make_box_input_ttl">チャットパスワード</p>
            <p class="patient-make_box_input_content">※半角入力、アルファベット、数字を6文字以上で作成して下さい。</p>
            <input v-model="password" type="text" name="チャットパスワード" required placeholder="チャットパスワード" />
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <br />
          <button @click="make()" class="patient-make_btn"
            :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      newPatientId: "",
    };
  },
  methods: {
    // 患者チャット patient を作成する
    async make() {
      //  patient 情報を patientsテーブルに登録
      const newPatientNamePass = {
        name: this.name,
        password: this.password,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/patient", newPatientNamePass);
      // patients テーブルで作成されたデータの id を検索して patient_idを見つける。
      const getNewPatientId = await this.$axios.post("http://127.0.0.1:8000/api/v1/patient-search", newPatientNamePass);
      this.newPatientId = getNewPatientId.data.data.id;
      // ログインアカウントがclient か workerかを判別する。
      if (this.$store.state.clientOrWorker == 'client') {
        // clientの場合、中間のclient-patientsテーブルに患者チャット作成者のclient_idと作ったpatient_idを記録。
        const clientIdAndPatientId = {
        client_id: this.$store.state.loginUserId,
        patient_id: this.newPatientId,
        };
        await this.$axios.post("http://127.0.0.1:8000/api/v1/client-patient", clientIdAndPatientId);
      } else if (this.$store.state.clientOrWorker == 'worker') {
        // workerの場合、中間のworker-patientsテーブルに患者チャット作成者のworker_idと作ったpatient_idを記録。
        const workerIdAndPatientId = {
        worker_id: this.$store.state.loginUserId,
        patient_id: this.newPatientId,
        };
        await this.$axios.post("http://127.0.0.1:8000/api/v1/worker-patient", workerIdAndPatientId);
      }
      // サンクスページで名前とパスワードを表示するために、「patient_id」「名前」「パスワード」をクエリで送る。
      this.$router.push({ path: 'thanks-make-patient' , query :{ patient_id: this.newPatientId,name: this.name, password: this.password }});
    },
  },
  created() {
    // firebaseのログインチェック
    this.$store.dispatch('onAuth')
  }
}
</script>

<style>
.patient-make{
  display: flex;
  justify-content: center;
}
.patient-make_box{
  width: 400px;
  height: auto;
  text-align: center;
  border: 2px solid rgb(42, 171, 191);
  background-color: rgb(211, 252, 237);
  border-radius: 10px;
  padding: 50px;
}
.patient-make_box_ttl{
  font-size: 30px;
}
.patient-make_box_content{
  margin-top: 10px;
  font-size: 12px;
}
.patient-make_box_input_ttl{
  font-size: 20px;
  font-weight: bold;
}
.patient-make_box_input_content{
  
  font-size: 12px;
}
.patient-make_box input{
  margin: 0 10px 10px 10px;
  width: 400px;
  height: 30px;
  border: 2px solid rgb(42, 171, 191);
  border-radius: 10px;
}
.patient-make_btn{
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
</style>