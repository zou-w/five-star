<template>
  <div style="margin-top: -2%;">
    <el-steps :active="0" align-center>
      <el-step title="申报点赞" description="2022-03-18开始"></el-step>
      <el-step
        title="学院复核和审查"
        description="2022-03-28至2022-04-03"
      ></el-step>
      <el-step title="评委会初审" description="4月上旬"></el-step>
      <el-step title="网络投票" description="4月22日前"></el-step>
      <el-step title="学校审定" description="4月底"></el-step>
      <el-step title="公开表彰" description="5月上旬"></el-step>
    </el-steps>
    <div class="btns">
      <el-button size="mini" @click="topush" type="primary"
        >我要推荐(申报)</el-button
      >
      <el-button size="mini" @click="tolike" type="primary"
        >查看已推荐</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logForm: {
        username: '',
        password: ''
      }
    }
  },
  created() {},
  methods: {
    tolike() {
      if (!window.sessionStorage.getItem('token')) {
        this.$message.warning('请先登录！')
        this.$router.push('/login')
      } else {
        this.$router.push('/like')
      }
    },
    topush() {
      if (!window.sessionStorage.getItem('token')) {
        this.$message.warning('请先登录！')
        this.$router.push('/login')
      } else {
        this.$router.push('/push')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-steps {
  width: 76%;
  margin: 0 auto;
  margin-top: 75px;
  /deep/.el-step__title {
    font-size: 0.33rem;
  }
}
@media only screen and (max-width: 1024px) {
  .el-steps {
    width: 90%;
  }
}
.btns {
  width: 240px;
  margin: 0 auto;
  margin-top: 120px;
  .el-button {
    width: 112px;
  }
}
.el-card {
  height: 100%;
  /*margin: 0 80px;*/
}

/*步骤条样式修改------------start----------*/
/*is-finish 圆圈颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__head.is-finish {
  color: #eb6f67 !important;
  border-color: #eb6f67 !important;
}

/*is-process 圆圈颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__head.is-process {
  color: #a12327;
  border-color: #a12327;
}

/*is-wait 圆圈颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__head.is-wait {
  color: #969696;
  border-color: #969696;
}

/*is-finish title 颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__title.is-finish {
  color: #a12327;
  font-weight: 700;
}
/*is-wait title 颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__title.is-wait {
  color: #969696;
  font-weight: 700;
}
/*is-wait des 颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__description.is-wait {
  color: #969696;
  font-weight: 700;
}
/*is-finish des 颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__description.is-process {
  color: #a12327;
  font-weight: 700;
}
/*is-process  title 颜色*/
.el-steps.el-steps--horizontal[data-v-9ebad220]
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__title.is-process {
  font-weight: 700;
  color: #a12327;
}
/*description 颜色*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__description.is-finish {
  color: #a12327;
}
/*is-finish 进程结束，is-process 状态颜色非加粗*/
.el-steps.el-steps--horizontal
  /deep/
  .el-step.is-horizontal.is-center
  /deep/
  .el-step__title.is-process {
  font-weight: 700;
  color: #a12327;
}
</style>
