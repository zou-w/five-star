<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评奖评优</el-breadcrumb-item>
      <el-breadcrumb-item>审核记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getRecordsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getRecordsList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="recordList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="学号" prop="stuNum"></el-table-column>
        <el-table-column label="学院" prop="college"></el-table-column>
        <!-- <el-table-column label="评选类别" prop="star"></el-table-column> -->
        <el-table-column label="审核结果" prop="status">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status === '0'"
              >代受理</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === '1'"
              >已推荐</el-tag
            >
            <el-tag type="danger" v-else>不符合</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="处理人" prop="handler"></el-table-column>
        <el-table-column label="审核时间">
          <template slot-scope="scope">
            {{ scope.row.addTime }}
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      recordList: [],
      total: 0
    }
  },
  created() {
    this.getRecordsList()
  },
  methods: {
    async getRecordsList() {
      const { data: res } = await this.$http.get(
        '/application/admin/recording',
        {
          params: this.queryInfo
        }
      )
      if (res.data.meta.status !== '200') {
        this.$message.error('获取审核记录失败!')
      }
      this.recordList = res.data.recordList.reverse()
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getRecordsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getRecordsList()
    }
  }
}
</script>

<style lang="less" scoped></style>
