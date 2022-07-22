<template>
  <div class="login_container">
    <div class="login_box">
      <h1
        style="margin-left: 26px; font-family: 'Microsoft YaHei',serif;"
        @click="adminLogin"
      >
        管理员登录
      </h1>
      <!--登陆表单区域-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" size="mini">登录</el-button>
          <el-button type="info" @click="resetLoginForm" size="mini"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return null
        const { data: res } = await this.$http.post(
          '/application/admin/login',
          this.loginForm
        )
        if (res.data.meta.status !== '200')
          return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        window.sessionStorage.setItem('token', res.data.user.token)
        window.sessionStorage.setItem('uname', this.loginForm.username)
        this.$router.push({
          name: 'AdminHome',
          params: { username: this.loginForm.username }
        })
      })
    },
    adminLogin() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
}
@media only screen and (min-width: 1024px) {
  .login_box {
    width: 320px;
    height: 42%;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
@media only screen and (max-width: 1024px) {
  .login_box {
    width: 70%;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
