<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评奖评优</el-breadcrumb-item>
      <el-breadcrumb-item>参评记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getParticipantsList(1)"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getParticipantsList(1)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-switch
            class="isnew"
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="只看最新"
            inactive-text="全部查看"
            @change="participantsChange"
          >
          </el-switch>
        </el-col>
      </el-row>
      <!--用户列表区域-->
      <el-table :data="userlist" border stripe>
        <el-table-column prop="stuId" label="编号" width="70">
        </el-table-column>
        <el-table-column prop="times" label="推荐次数"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="stuNum" label="学号"> </el-table-column>
        <el-table-column prop="college" label="学院"> </el-table-column>
        <el-table-column prop="star" label="评选类别"> </el-table-column>
        <el-table-column prop="theWay" label="参评方式"> </el-table-column>
        <el-table-column label="参评状态" prop="status">
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
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-tooltip content="查看" placement="top">
              <el-button
                type="info"
                icon="el-icon-view"
                size="mini"
                @click="setDeclarationInfo(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="修改" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="setEditInfo(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="处理" placement="top">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setStatus(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!--申报条件查看对话框-->
    <el-dialog
      title="申报条件"
      :visible.sync="declarationInfoVisible"
      width="70%"
      @close="declarationInfoClosed"
    >
      <el-table :data="declarationInfo">
        <el-table-column property="info" label="" width="150"></el-table-column>
        <el-table-column property="content" label=""></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="declarationInfoVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!--审核处理对话框-->
    <el-dialog
      title="审核处理"
      :visible.sync="modifyStatusVisible"
      width="50%"
      @close="modifyStatusClosed"
    >
      <div>
        <p>参评同学: {{ ptpInfo.name }}</p>
        <p v-if="ptpInfo.status === '0'">当前受理状态: 待处理</p>
        <p v-else-if="ptpInfo.status === '1'">当前受理状态: 已推荐</p>
        <p v-else>当前受理状态: 不符合</p>
        <p>
          审核结果：
          <el-select v-model="selectedStatusId" placeholder="请选择" value="">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.status"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleStatusChange">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改申报材料对话框-->
    <el-dialog
      title="修改材料"
      :visible.sync="editDialogVisible"
      width="70%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editForm.stuNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="评选类型">
          <el-input v-model="editForm.star"></el-input>
        </el-form-item>
        <el-form-item label="学业学习排名情况" prop="rank">
          <el-input v-model="editForm.rank"></el-input>
        </el-form-item>
        <el-form-item label="获奖学金情况" prop="scholarship">
          <el-input
            v-model="editForm.scholarship"
            type="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="获得荣誉情况" prop="honor">
          <el-input
            v-model="editForm.honor"
            type="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="科技竞赛获奖情况" prop="techHonor">
          <el-input
            v-model="editForm.techHonor"
            type="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="社会实践情况" prop="socialPractice">
          <el-input
            v-model="editForm.socialPractice"
            type="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="等级考试通过情况" prop="rankTest">
          <el-input
            v-model="editForm.rankTest"
            type="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item> -->
        <el-form-item label="论文发表情况" prop="paper">
          <el-input
            v-model="editForm.paper"
            type="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="其他获奖" prop="others">
          <el-input
            v-model="editForm.others"
            type="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="先进事迹" prop="goodDeeds">
          <el-input
            v-model="editForm.goodDeeds"
            type="textarea"
            maxlength="1000"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="座右铭" prop="motto">
          <el-input
            v-model="editForm.motto"
            type="textarea"
            maxlength="40"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="辅导员姓名" prop="assistant">
          <el-input v-model="editForm.assistant"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNum">
          <el-input v-model="editForm.phoneNum"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        pagesize: 10
      },
      userlist: [],
      total: 0,
      // 分配角色对话框的显示与隐藏
      modifyStatusVisible: false,
      // 需要被分配角色的用户信息
      stuInfo: {
        name: '张三',
        status: '待处理'
      },
      // 所有角色的数据列表
      statusList: [
        {
          id: 1,
          status: '推荐'
        },
        {
          id: 2,
          status: '不符合'
        }
      ],
      selectedStatusId: '',
      declarationInfoVisible: false,
      declarationInfo: [],
      ptpInfo: {},
      editDialogVisible: false,
      editFormRules: {
        motto: [{ message: '请输入座右铭', trigger: 'blur' }]
      },
      editForm: {},
      value: false
    }
  },
  created() {
    this.getParticipantsList()
  },
  methods: {
    async getParticipantsList(pgnum) {
      if (pgnum) this.queryInfo.pagenum = pgnum
      if (!this.value) {
        const { data: res } = await this.$http.get(
          '/application/admin/participants',
          {
            params: this.queryInfo
          }
        )
        if (res.data.meta.status !== '200')
          return this.$message.error(res.data.meta.msg)
        this.userlist = res.data.participantsList
        this.total = res.data.total
      } else {
        const { data: res } = await this.$http.get(
          '/application/admin/newparticipants',
          {
            params: this.queryInfo
          }
        )
        if (res.data.meta.status !== '200')
          return this.$message.error(res.data.meta.msg)
        this.userlist = res.data.participantsList
        this.total = res.data.total
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getParticipantsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getParticipantsList()
    },
    setStatus(ptpInfo) {
      this.ptpInfo = ptpInfo
      this.modifyStatusVisible = true
    },
    modifyStatusClosed() {
      this.selectedStatusId = ''
      this.ptpInfo = {}
    },
    async handleStatusChange() {
      if (!this.selectedStatusId && this.selectedStatusId !== 0) {
        return this.$message.error('请选择处理结果')
      }
      const { data: res } = await this.$http.put(
        `/application/admin/participants/${this.ptpInfo.stuId}/verify`,
        {
          newStatus: this.selectedStatusId
        }
      )
      if (res.data.meta.status !== '200') {
        return this.$message.error(res.data.meta.msg)
      } else if (res.data.meta.status === '200') {
      } else {
        return this.$message.error('处理失败！')
      }
      this.getParticipantsList()
      this.modifyStatusVisible = false
    },
    async setDeclarationInfo(ptpInfo) {
      const { data: res } = await this.$http.get(
        `/application/admin/participants/${ptpInfo.stuId}/declaration`
      )
      console.log(res)
      if (res.data.meta.status !== '200') {
        return this.$message.error('查询申报材料失败！')
      }
      this.declarationInfo = res.data.declarationInfo
      this.declarationInfoVisible = true
    },
    declarationInfoClosed() {
      this.declarationInfo = {}
    },
    editDialogClosed() {
      this.editForm = {}
    },
    async editInfo() {
      const { data: res } = await this.$http.put(
        `/application/admin/participants/${this.editForm.stuId}/edit`,
        this.editForm
      )
      if (res.data.meta.status !== '200') {
        return this.$message.error('修改该同学申报材料失败！')
      }
      this.$message.success('修改该同学申报材料成功！')
      this.getParticipantsList()
      this.editDialogVisible = false
    },
    async setEditInfo(ptpInfo) {
      const { data: res } = await this.$http.get(
        `/application/admin/participants/${ptpInfo.stuId}/edit`
      )
      if (res.data.meta.status !== '200') {
        return this.$message.error('获取信息失败！')
      }
      this.editForm = res.data.declarationInfo[0]
      this.editDialogVisible = true
    },
    async participantsChange() {
      this.getParticipantsList()
    }
  }
}
</script>

<style lang="less" scoped>
.isnew {
  margin-top: 10px;
}
</style>
