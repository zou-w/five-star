<template>
  <div class="main_box">
    <el-button
      class="backBtn"
      icon="el-icon-arrow-left"
      circle
      size="mini"
      @click="setBack"
    ></el-button>
    <div class="seach_box">
      <el-input
        placeholder="请输入编号或姓名"
        v-model="queryInfo.query"
        clearable
        size="mini"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getStuList"
        ></el-button>
      </el-input>
    </div>
    <div
      class="infinite-list-wrapper"
      v-infinite-scroll="load"
      infinite-scroll-distance="10"
    >
      <el-card v-for="item in count" class="list-item" :key="item.stuId">
        <img
          class="pic"
          style="border-radius: 5px"
          :src="item.pic"
          alt=""
          @click="seeDetails(item.stuId)"
        />
        <div class="info">
          <span class="text-name">{{ item.name }}</span>
          <span class="text-college">{{ item.stuId }}</span>
        </div>
        <div class="star">
          <span>参评：{{ item.star }}</span>
        </div>
        <div class="like">
          <span class="number"
            >{{ item.vote }} <span style="font-size: 6px">票</span></span
          >
          <span class="like_btn">
            <el-button
              class="voteBtn iconfont icontoupiao"
              type="danger"
              circle
              size="mini"
              @click="handleVote(item)"
              :disabled="isVoteDisabled"
            ></el-button>
          </span>
        </div>
      </el-card>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
    <el-dialog
      title="优秀事迹"
      :visible.sync="detailsVisible"
      width="80%"
      @close="detailsClosed"
    >
      <el-table :data="details">
        <el-table-column property="info" label="" width="60"></el-table-column>
        <el-table-column property="content" label=""></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailsVisible = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: [],
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 12
      },
      total: 10000,
      loading: true,
      d: '',
      h: '',
      m: '',
      s: '',
      isVoteDisabled: false,
      detailsVisible: false,
      details: [],
      isclick: false
    }
  },
  created() {
    // this.getStuList()
  },
  computed: {
    noMore() {
      return this.count.length >= this.total
    },
    disabled() {
      return this.loading || this.noMore
    },
    object1(a, b) {
      return b.vote - a.vote
    }
  },
  methods: {
    async getStuList() {
      if (!this.isclick) this.isclick = true
      else return null
      this.count = []
      this.queryInfo.pageNum = 1
      const { data: res } = await this.$http.get('/application/view', {
        params: this.queryInfo
      })
      if (res.data.meta.status !== '200') {
        // this.$message.error('获取投票列表失败！')
      }
      this.queryInfo.pageNum = this.queryInfo.pageNum + 1
      res.data.participantsList.forEach(item => {
        if (!item.pic) {
          if (item.sex === '男') {
            item.pic =
              'https://ae01.alicdn.com/kf/Hf32cd69e3bd14c27a64f19441b50f7e9H.png'
          } else {
            item.pic =
              'https://ae01.alicdn.com/kf/H3f57005b899f4d7b9116bedcb66fdbacs.png'
          }
        }
      })
      this.count = this.count.concat(res.data.participantsList)
      this.total = res.data.total
      this.isclick = false
    },
    async load() {
      if (!this.noMore) {
        setTimeout(async () => {
          if (!this.isclick) this.isclick = true
          else return null
          const { data: res } = await this.$http.get('/application/view', {
            params: this.queryInfo
          })
          if (res.data.meta.status !== '200') {
            // this.$message.error('获取投票列表失败！')
            return null
          }
          this.queryInfo.pageNum = this.queryInfo.pageNum + 1
          res.data.participantsList.forEach(item => {
            if (!item.pic) {
              if (item.sex === '男') {
                item.pic =
                  'https://ae01.alicdn.com/kf/Hf32cd69e3bd14c27a64f19441b50f7e9H.png'
              } else {
                item.pic =
                  'https://ae01.alicdn.com/kf/H3f57005b899f4d7b9116bedcb66fdbacs.png'
              }
            }
          })
          this.count = this.count.concat(res.data.participantsList)
          this.total = res.data.total
          this.isclick = false
        }, 1000)
      } else {
        this.loading = false
      }
    },
    async handleVote(item) {
      const { data: res } = await this.$http.put(
        `/application/${item.stuId}/vote`
      )
      if (res.data.meta.status === '200') {
        this.$message.success('投票成功！')
        item.vote = item.vote + 1
      } else if (res.data.meta.status === '400') {
        this.isVoteDisabled = true
        this.$message.info('今日投票次数已满！')
      } else {
        this.$message.error('投票失败！')
      }
    },
    async seeDetails(stuId) {
      const { data: res } = await this.$http.get(
        `/application/${stuId}/details`
      )
      if (res.data.meta.status !== '200') {
        return this.$message.error('获取信息失败！')
      }
      this.details = res.data.details
      // this.details = []
      this.detailsVisible = true
    },
    detailsClosed() {
      this.details = []
    },
    setBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.el-card {
  padding: 0 !important;
}
.infinite-list-wrapper {
  width: 720px;
  margin: 0 auto;
  margin-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #d3d3d3;
  p {
    font-size: 14px;
    color: #fff;
    display: block;
  }
}
.infinite-list-wrapper::-webkit-scrollbar {
  width: 0;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  background: #fff6f6;
  color: #000;
  margin: 5px 5px;
  width: 108px;
  float: left;
}
.seach_box {
  width: 720px;
  height: 40px;
  margin: 0 auto;
}
.el-input {
  width: 300px;
  height: 10px;
  margin: 10px 5px;
}
.Date {
  display: block;
  width: 100%;
  text-align: center;
  span {
    font-size: 12px;
    color: blue;
    margin: 0 5px;
  }
}
.info {
  font-size: 10px;
  width: 100%;
}
.text-name {
  float: left;
}
.text-college {
  float: right;
}
.star {
  margin-top: 15px;
  font-size: 8px;
  span {
    float: left;
  }
}
.like {
  margin-top: 28px;
  height: 20px;
}
.number {
  color: #f56c6c;
  font-size: 14px;
  float: left;
  margin-top: 2px;
}
.like_btn {
  float: right;
  margin-top: -2px;
}
.pic {
  width: 70px;
  height: 70px;
}
.el-alert {
  width: 710px;
  margin: 5px 0 0 5px;
}
.backBtn {
  display: none;
}
@media only screen and (min-width: 1024px) {
  .main_box {
    height: 80%;
  }
  .infinite-list-wrapper {
    height: 100%;
  }
}
@media only screen and (max-width: 1024px) {
  .main_box {
    height: 82%;
  }
  .infinite-list-wrapper {
    width: 100%;
    padding-left: 5px;
    height: 100%;
  }
  .list-item {
    width: 110px;
  }
  .seach_box {
    width: 80%;
    margin-top: 25px;
  }
  .pic {
    width: 76px;
    height: 70px;
  }
  .el-alert {
    width: 95%;
    margin: 5px 0 0 5px;
  }
  .backBtn {
    display: block;
    position: fixed;
    top: 0.7%;
    left: 4%;
    opacity: 0.5;
  }
}
</style>
