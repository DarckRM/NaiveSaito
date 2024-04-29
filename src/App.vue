<script setup>

</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-theme-editor>
          <n-config-provider :theme-overrides="theme">
            <router-view></router-view>
          </n-config-provider>
        </n-theme-editor>
      </n-notification-provider>
    </n-dialog-provider>
  </n-message-provider>
</template>

<style>
#app {
  font-family: v-sans, v-mono, other-fallbacks;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: auto;
}
</style>

<script>
import { defineComponent } from "vue";
import {
  NDivider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NThemeEditor,
  NConfigProvider
} from "naive-ui";
import { router } from "./router";

export default defineComponent({
  setup() {
    const theme = {
      common: {
        primaryColor: "#EE5B79FF",
        primaryColorHover: "#FF839CFF",
        primaryColorPressed: "#D74761FF",
        primaryColorSuppl: "#F2759AFF",
      },
    }
    return {
      theme
    }
  },
  components: {
    NDivider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
    NThemeEditor,
    NConfigProvider
  },
});
</script>
