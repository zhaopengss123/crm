<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formModel: {
        userName: "",
        userPwd: ""
      }
    };
  },
  mounted() {
    const token = this.$route.query.token; 
    if (token) {
        this.$store.commit("setUserInfo", token);
        
        this.$router.push(`/home/tasklist`);
    } else {
      //window.location.href = "http://192.168.1.207:8080/";
      //window.location.href = "http://tusercenter.beibeiyue.cn/c/";
      window.location.href = "http://ucenter.beibeiyue.com";
    }
  }
};
</script>
