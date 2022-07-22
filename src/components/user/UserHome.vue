<template>
  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- <el-footer style="padding: 0;height: 100px;">
      <img class="footer_img" style="margin: 0 auto;" src="https://ae01.alicdn.com/kf/H5478b77eb2f649079a546999fbf42d29y.jpg" alt="" width="100%" height="100">
    </el-footer> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {},
  methods: {
    tohome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-main {
  overflow-y: auto;
  overflow-x: hidden;
}
@media only screen and (min-width: 1024px) {
  .el-main {
    padding: 0;
    margin: 0;
    margin-top: 12%;
  }
  .el-main::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  // .el-footer {
  //   display: none;
  // }
  /*.el-main::-webkit-scrollbar-thumb {*/
  /*!*滚动条里面小方块*!*/
  /*border-radius   : 10px;*/
  /*background-color: skyblue;*/
  /*background-image: -webkit-linear-gradient(*/
  /*45deg,*/
  /*rgba(255, 255, 255, 0.2) 25%,*/
  /*transparent 25%,*/
  /*transparent 50%,*/
  /*rgba(255, 255, 255, 0.2) 50%,*/
  /*rgba(255, 255, 255, 0.2) 75%,*/
  /*transparent 75%,*/
  /*transparent*/
  /*);*/
  /*}*/
  /*.el-main::-webkit-scrollbar-track {*/
  /*!*滚动条里面轨道*!*/
  /*box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);*/
  /*background   : #ededed;*/
  /*border-radius: 10px;*/
  /*}*/
}
@media only screen and (max-width: 1024px) {
  .el-main {
    padding: 0;
    margin: 0;
    margin-top: 34%;
  }
  .el-steps {
    height: 100px;
    padding: 0;
  }
}
</style>
