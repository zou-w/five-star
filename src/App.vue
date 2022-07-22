<template>
  <div id="app" ref="homePage">
    <router-view></router-view>
    <span class="jszc" ref="sspan"
      >@由重邮e站微+平台提供技术支持,疑问+群:512958501</span
    >
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      clientHeight: '',
      bclientHeight: ''
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  watch: {
    clientHeight: function() {
      if (this._isMobile()) {
        this.changeFixed(this.clientHeight)
      }
    }
  },
  methods: {
    changeFixed(clientHeight) {
      this.$refs.homePage.style.height = clientHeight + 'px'
      this.$refs.sspan.style.top = clientHeight + 'px'
    },
    _isMobile() {
      return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    }
  }
}
</script>
<style>
.jszc {
  position: fixed;
  width: 100%;
  text-align: center;
  letter-spacing: 0.4em;
  color: #808080;
  transform: translate(0, -100%);
}
</style>
