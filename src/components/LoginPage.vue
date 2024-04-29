<template>
  <n-space vertical justify="center" align="center" :style="{ marginTop: '100px'}">
    <n-space align="center">
      <n-avatar :size="120" round src="src/assets/logo.png" :style="{ backgroundColor: 'white' }" />
      <n-h4>
        MyLouise Backfront Alpha
      </n-h4>
    </n-space>
    <n-card hoverable embedded style="width: 800px">
      <n-space justify="center" align="center">
        <n-space vertical>
          <n-image src="src/assets/moe.png"></n-image>
          <n-h1 prefix="bar">Welcome home</n-h1>
        </n-space>
        <n-card :title="loginPageTitle" id="loginCard">
          <n-tabs @update:value="updateValue" default-value="signin">
            <n-tab-pane name="signin" tab="登录">
              <n-form :model="loginForm">
                <n-form-item label="Account">
                  <n-input v-model:value="loginForm.username" placeholder="Account" />
                </n-form-item>
                <n-form-item label="Password">
                  <n-input v-on:keyup.enter="signUp()" type="password" show-password-on="mousedown"
                    placeholder="Password" :maxlength="8" v-model:value="loginForm.password" />
                </n-form-item>
              </n-form>
              <n-button type="primary" @click="quickLogin()">Login</n-button>
            </n-tab-pane>
            <n-tab-pane tab="Dashboard">
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-space>
    </n-card>
  </n-space>
</template>

<style>
#loginCard {
  width: 300px;
  margin: 50px auto;
}

#loginDiv {
  margin: 100px auto;
}
</style>

<script>
import { defineComponent } from "vue";
import { useMessage } from "naive-ui";
import { router } from "../router";
import ImageRetrieve from "./ImageRetrieve.vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const message = useMessage();
    return {
      message,
    };
  },
  data() {
    return {
      loginPageTitle: "TECH OTAKU SAVE THE WORLD",
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    useMessage,
    ImageRetrieve,
  },
  methods: {
    updateValue(value) {
      if (value == "image-retrieve") router.push("/image-retrieve");
    },
    signUp() {
      this.message.loading("登录中");
      this.loginPageTitle = "Sign Up";
      this.$axios.post("login", this.loginForm).then((result) => {
        let data = result.data;
        if (data.code == 200) {
          this.message.destroyAll();
          this.message.success("登录成功");
          const timestamp = data.data.password;
          this.$store.commit("set_token", timestamp);
          router.push({
            path: "/home/index",
          });
        } else if (data.code == 403) {
          this.message.destroyAll();
          this.message.warning("用户已被禁用");
        } else {
          this.message.destroyAll();
          this.message.error("用户名或密码错误");
        }
      });
    },
    quickLogin() {
      this.message.destroyAll();
      this.message.success("登录成功");
      this.$store.commit("set_token", "123456");
      router.push({
        path: "/home/index",
      });
    },
  },
});
</script>
