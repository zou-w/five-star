<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入echarts
import echarts from 'echarts'

export default {
  data() {
    return {
      option: {
        title: {
          text: '五四之星参评数据统计',
          subtext: '总人数： ',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['已推荐', '不符合', '待处理']
        },
        series: [
          {
            name: '人数统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {
                value: 0,
                name: '已推荐',
                itemStyle: {
                  color: '#26A65B'
                }
              },
              {
                value: 0,
                name: '不符合',
                itemStyle: {
                  color: '#D24D57'
                }
              },
              {
                value: 0,
                name: '待处理',
                itemStyle: {
                  color: '#EB7347'
                }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created() {},
  // 此时，页面上的元素已经被渲染完毕了
  async mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    const { data: res1 } = await this.$http.get('/application/admin/report')
    if (res1.data.meta.status !== '200') {
      this.$message.error('获取数据失败！')
    }

    var res = res1.data.reportData
    this.option.series[0].data.forEach((item, index) => {
      item.value = res[index]
    })
    this.option.title.subtext =
      this.option.title.subtext + this.sum(res1.data.reportData) + ' 人'
    // 5.展示数据
    myChart.setOption(this.option)
  },
  methods: {
    sum(arr) {
      var s = 0
      for (var i = arr.length - 1; i >= 0; i--) {
        s += arr[i]
      }
      return s
    }
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 1024px) {
  #main {
    width: 750px;
    height: 400px;
    margin-left: 150px;
  }
}

@media only screen and (max-width: 1024px) {
  #main {
    width: 240px;
    height: 500px;
    /*margin-left: 150px;*/
  }
}
</style>
