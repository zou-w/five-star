<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div style="height: 60px;">
        <el-avatar :src="userinfo.avatar"></el-avatar>
        <div class="user">
          <span class="username">{{ userinfo.username }}</span>
          <br />
          <span class="status" v-if="userinfo.status === 'online'"><i style="color: lightgreen; margin-right: 5px;" class="el-icon-success"></i>在线</span>
          <span class="status" v-else>离线</span>
        </div>
      </div>
      <el-button type="info" @click="logout" size="mini">退出</el-button>
    </el-header>
      <!--页面主题区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '300px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath">
          <el-menu-item index="/admin/welcome">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <!--一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!--一级菜单的模板-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{ subItem.authName }}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [
      ],
      iconsObj: {
        101: 'el-icon-user-solid',
        102: 'el-icon-s-order',
        104: 'el-icon-menu',
        105: 'el-icon-menu',
        106: 'el-icon-s-data'
      },
      isCollapse: false,
      // 被激活的连接地址
      activePath: '/admin/welcome',
      userinfo: {
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        username: '',
        status: 'online'
      }
    }
  },
  created () {
    this.userinfo.username = window.sessionStorage.getItem('uname')
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/admin/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('/application/admin/menulist')
      if (res.data.meta.status !== '200') return this.$message.error(res.data.meta.msg)
      this.menulist = res.data.menulist
    },
    // 点击按钮实现左侧菜单折叠展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}

</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.user {
  width: 60px;
  height: 60px;
  padding-top: 20px;
  margin-left: 15px;
  line-height: 20px;
}

.username {
  font-size: 18px;
  margin: 0 !important;
}

.status {
  font-size: 12px;
  margin: 0 !important;
}
</style>
