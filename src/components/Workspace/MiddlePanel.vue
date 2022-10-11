<template>
  <div id="middle-panel-area">
    <Split style="height: 500px;" direction="vertical">
      <SplitArea sizes="90">
        <MiddleTopPanel />
      </SplitArea>
      <SplitArea sizes="10">
        <MiddleBottomPanel />
      </SplitArea>
    </Split>
  </div>
</template>

<script>
import MiddleTopPanel from "./MiddleTopPanel";
import MiddleBottomPanel from "./MiddleBottomPanel";
export default {
  name: "MiddlePanel",
   components: {
    MiddleTopPanel,
    MiddleBottomPanel,
  },
  data() {
    return {
      //      msg: "Welcome to Your Vue.js App !!"
    };
  },
};
</script>

<style scoped>
</style>
