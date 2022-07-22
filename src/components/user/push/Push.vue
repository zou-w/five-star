<template>
  <div style="margin-top: 2%;">
    <el-card>
      <h1 style="font-size: 20px;">推荐申报</h1>
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'top'"
          :before-leave="beforTabLeave"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="stuNum">
              <el-input v-model="addForm.stuNum"></el-input>
            </el-form-item>
            <el-button
              type="info"
              class="btnAdd"
              @click="back"
              style="float: left;margin-left: 0"
              >返回</el-button
            >
            <el-button type="primary" class="btnAdd" @click="next"
              >下一步</el-button
            >
          </el-tab-pane>
          <el-tab-pane label="申报信息" name="1" :disabled="isDisabled">
            <el-form-item label="评选类型" prop="region">
              <el-select
                v-model="addForm.star"
                placeholder="请选择评选类型"
                value=""
              >
                <el-option
                  label="党员模范之星"
                  value="党员模范之星"
                ></el-option>
                <el-option
                  label="孝老敬亲之星"
                  value="孝老敬亲之星"
                ></el-option>
                <el-option
                  label="勤奋好学之星"
                  value="勤奋好学之星"
                ></el-option>
                <el-option
                  label="自立自强之星"
                  value="自立自强之星"
                ></el-option>
                <el-option
                  label="才艺特长之星"
                  value="才艺特长之星"
                ></el-option>
                <el-option
                  label="科技创新之星"
                  value="科技创新之星"
                ></el-option>
                <el-option
                  label="网络建设之星"
                  value="网络建设之星"
                ></el-option>
                <el-option
                  label="志愿奉献之星"
                  value="志愿奉献之星"
                ></el-option>
                <el-option
                  label="自主创业之星"
                  value="自主创业之星"
                ></el-option>
                <el-option
                  label="健康运动之星"
                  value="健康运动之星"
                ></el-option>
                <el-option
                  label="文明寝室之星"
                  value="文明寝室之星"
                ></el-option>
                <el-option
                  label="优秀班级之星"
                  value="优秀班级之星"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button
              type="primary"
              size="mini"
              :disabled="addForm.star === ''"
              @click="handlePicVisible"
              >查看往届优秀示例</el-button
            >
            <el-form-item
              label="学业学习排名情况(例：本人排名/总人数)"
              prop="rank"
            >
              <el-input v-model="addForm.rank"></el-input>
            </el-form-item>
            <el-form-item label="获奖学金情况" prop="scholarship">
              <el-input
                v-model="addForm.scholarship"
                type="textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="获得荣誉情况" prop="honor">
              <el-input
                v-model="addForm.honor"
                type="textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="科技竞赛获奖情况" prop="techHonor">
              <el-input
                v-model="addForm.techHonor"
                type="textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="社会实践情况" prop="socialPractice">
              <el-input
                v-model="addForm.socialPractice"
                type="textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="等级考试通过情况" prop="rankTest">
              <el-input
                v-model="addForm.rankTest"
                type="textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item> -->
            <el-form-item label="论文发表情况" prop="paper">
              <el-input
                v-model="addForm.paper"
                type="textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="其他获奖" prop="others">
              <el-input
                v-model="addForm.others"
                type="textarea"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="先进事迹" prop="goodDeeds">
              <el-input
                v-model="addForm.goodDeeds"
                type="textarea"
                maxlength="1000"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="座右铭" prop="motto">
              <el-input
                v-model="addForm.motto"
                type="textarea"
                maxlength="40"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="辅导员姓名" prop="assistant">
              <el-input v-model="addForm.assistant"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phonenum">
              <el-input v-model="addForm.phonenum"></el-input>
            </el-form-item>
            <!-- <el-form-item label="头像上传" prop="file">
              <el-upload
                class="avatar-uploader"
                action=""
                accept="image/jpeg,image/gif,image/png"
                :show-file-list="false"
                :on-change="onUploadChange"
                :auto-upload="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png/gif文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item> -->
            <el-button type="primary" class="btnAdd" @click="add"
              >提交</el-button
            >
            <el-button type="info" class="btnAdd" @click="rewrite"
              >重填</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog :title="addForm.star" :visible.sync="dialogVisible" width="80%">
      <img alt="" v-bind:src="picUrl" width="100%" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')
export default {
  data() {
    return {
      activeIndex: '0',
      isDisabled: true,
      addForm: {
        name: '',
        stuNum: '',
        star: '',
        rank: '',
        scholarship: '',
        honor: '',
        techHonor: '',
        socialPractice: '',
        // rankTest: '',
        paper: '',
        others: '',
        goodDeeds: '',
        motto: '',
        phonenum: '',
        assistant: ''
        // file: ''
      },
      addFormRules: {
        star: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        stuNum: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        motto: [{ required: true, message: '请输入座右铭', trigger: 'blur' }],
        assistant: [
          { required: true, message: '请输入辅导员姓名', trigger: 'blur' }
        ],
        phonenum: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
        ],
        rank: [
          { required: true, message: '请输入学业学习排名情况', trigger: 'blur' }
        ]
      },
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      dialogVisible: false,
      picUrl: '',
      imgUrl: {
        党员模范之星:
          'https://ae01.alicdn.com/kf/H8567d11be14d4c6da080364ddd03e8f9h.jpg',
        孝老敬亲之星:
          'https://ae01.alicdn.com/kf/H8bb9f919691c4a148fd820303113f289k.jpg',
        勤奋好学之星:
          'https://ae01.alicdn.com/kf/Ha84c52b83cfb44b6af8847d0e0ce2c52C.jpg',
        自立自强之星:
          'https://ae01.alicdn.com/kf/H3eaed451dc13456b8409a2be192139b7I.jpg',
        才艺特长之星:
          'https://ae01.alicdn.com/kf/H8739f64ebcf6431aa1a8f47b439bf6bc1.jpg',
        科技创新之星:
          'https://ae01.alicdn.com/kf/H67c15a2b587d4a6eb87826777b1d85b0Z.jpg',
        网络建设之星:
          'https://ae01.alicdn.com/kf/H052fcdbfb48c45a5b842c49e46ad6c2dx.jpg',
        志愿奉献之星:
          'https://ae01.alicdn.com/kf/Hdb4b2edd354e4bb8a157df873583e7eeC.jpg',
        自主创业之星:
          'https://ae01.alicdn.com/kf/Hfeece4b103f34743b31f901d8e802bf5Z.jpg',
        健康运动之星:
          'https://ae01.alicdn.com/kf/H39677dbb9c2b443f93439c86cc0529cdV.jpg',
        文明寝室之星:
          'https://ae01.alicdn.com/kf/H5b1577e05d9d4980afb317a0ee15449cw.jpg',
        优秀班级之星:
          'https://ae01.alicdn.com/kf/Hb80f783a6ae34c2b9a591fddc4d88dfcw.jpg'
      },
      imageUrl: ''
    }
  },
  created() {},
  methods: {
    beforTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '1') return false
    },
    async next() {
      const { data: res } = await this.$http.post('/application/check', {
        name: this.addForm.name,
        stuNum: this.addForm.stuNum
      })
      if (res.data.meta.status === '200') {
        this.isDisabled = false
        this.activeIndex = '1'
      } else {
        this.$message.error('请输入准确的姓名和学号！')
      }
    },
    handlePicVisible() {
      this.picUrl = this.imgUrl[this.addForm.star]
      this.dialogVisible = true
    },
    async add() {
      var ck = 0
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        ck = 1
      })
      if (!ck) return null
      if (!this.isPoneAvailable)
        return this.$message.error('请输入正确的11位手机号！')
      const { data: res } = await this.$http.post(
        '/application/recommend',
        this.addForm
      )
      if (res.data.meta.status !== '200') {
        this.$message.error('推荐失败！')
        return null
      }
      this.$message.success('推荐成功！')
      this.$router.push('/home')
    },
    async submitUpload(picData) {
      const { data: res } = await this.$http.post('/application/files', {
        file: picData
      })
      if (res.data.meta.status !== '200') {
        this.$message.error('上传头像失败！')
      }
      this.imageUrl = res.data.tmp_path
      this.addForm.file = res.data.tmp_path
    },
    async onUploadChange(file) {
      const isIMAGE =
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'image/png' ||
        file.raw.type === 'image/gif'
      const isLt1M = file.size / 1024 / 1024 < 0.5

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 500kb!')
        return false
      }
      // 对象存储上传开始
      // var timestamp = new Date().valueOf()
      // const { data: res } = await this.$http.get('/application/files')
      // if (res.data.meta.status !== '200') {
      //   return this.$message.error('头像上传失败！')
      // }
      // var Authorization = {
      //   TmpSecretId: res.data.credentials.credentials.tmpSecretId,
      //   TmpSecretKey: res.data.credentials.credentials.tmpSecretKey,
      //   XCosSecurityToken: res.data.credentials.credentials.sessionToken,
      //   StartTime: res.data.credentials.startTime,
      //   ExpiredTime: res.data.credentials.expiredTime
      // }
      var cos = new COS({
        getAuthorization: function(options, callback) {
          callback(Authorization)
        }
      })
      var cos = new COS({
        SecretId: '',
        SecretKey: ''
      })
      var _this = this
      cos.putObject(
        {
          Bucket: '' /* 必须 */,
          Region: '' /* 存储桶所在地域，必须字段 */,
          Key: `54star/${timestamp}_${file.name}` /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file.raw, // 上传文件对象
          onProgress: function(progressData) {
            // console.log('test')
            // console.log(JSON.stringify(progressData))
            // console.log(progressData.Location)
          }
        },
        function(err, data) {
          // console.log(err || data)
          _this.addForm.file = data.Location
          return err
        }
      )
      // 对象存储上传结束
      //
      //
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        _this.imageUrl = this.result
        //   _this.addForm.file = this.result
      }
    },
    rewrite() {
      location.reload()
    },
    back() {
      this.$router.go(-1)
    }
  },
  computed: {
    isPoneAvailable() {
      var myreg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

      return myreg.test(this.addForm.phonenum)
    },
    isPicAvailable() {
      return this.addForm.file
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  width: 720px;
  margin: 0 auto;
}
.btnAdd {
  margin-top: 15px;
  margin-left: 10px;
  float: right;
}
@media only screen and (max-width: 1024px) {
  .el-card {
    width: 90%;
    padding-left: 5px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #000;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
