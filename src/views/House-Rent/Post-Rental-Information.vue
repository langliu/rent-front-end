<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-row>
        <el-col :span="24">
          <h2>租赁发布</h2>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="出租类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="0">整租</el-radio>
            <el-radio label="1">合租</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="小区名称" prop="houseName">
          <el-input v-model="form.houseName"></el-input>
        </el-form-item>
        <el-form-item label="房屋面积" prop="houseArea">
          <el-input v-model="form.houseArea">
            <template slot="append">平方米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="房屋室数量">
          <el-input-number v-model="form.roomNum" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="房屋厅数量">
          <el-input-number v-model="form.hallNum" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="房屋卫数量">
          <el-input-number v-model="form.toiletNum" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="房屋楼层">
          <el-input-number v-model="form.floor" :min="-20" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="总楼层">
          <el-input-number v-model="form.floorTotal" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="地区">
          <el-select v-model="form.province" placeholder="省" @change="getCity">
            <el-option v-for="item in provinces"
                       :key="item.id"
                       :value="item.id"
                       :label="item.name">
            </el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="市" @change="getCounty">
            <el-option v-for="item in city"
                       :key="item.id"
                       :value="item.id"
                       :label="item.name">
            </el-option>
          </el-select>
          <el-select v-model="form.area" placeholder="区/县">
            <el-option v-for="item in county"
                       :key="item.id"
                       :value="item.id"
                       :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="租金" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" :rows="5" placeholder="请输入租赁信息描述"></el-input>
        </el-form-item>
        <el-form-item label="照片">
          <el-upload
              class="upload-demo"
              action="http://localhost:8888/upload/file"
              :on-success="handleSuccess"
              :before-upload="handleUpload"
              :file-list="fileList"
              :limit="5"
              :multiple="true"
              list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M，图片最多5张</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
              class="upload-demo"
              action="http://localhost:8888/upload/file"
              :on-success="videoSuccess"
              :before-upload="videoUpload"
              :file-list="fileList"
              :limit="1"
              :multiple="true"
              list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过40M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formValidation">确认发布</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Post-Rental-Information',
    data () {
      const number = (rule, value, callback) => {
        if (!Number(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      const telPhone = (rule, value, callbacks) => {
        if (!this.telPhone(value)) {
          callbacks(new Error('请输入正确的联系方式'))
        } else {
          callbacks()
        }
      }
      return {
        form: {
          token: sessionStorage.getItem('token'),
          type: '0', // 出租类型 0整租 1合租
          houseName: '', // 小区名称
          houseArea: '', // 房屋面积
          roomNum: 0, // 室数量
          hallNum: 0, // 厅数量
          toiletNum: 0, // 卫数量
          floor: 0, // 楼层
          floorTotal: 0, // 总楼层
          province: '', // 省
          city: '', // 市
          area: '', // 县/区
          address: '', // 地址
          price: '', // 租金 可小数点后2位 -1面议
          title: '',
          mobile: '',
          qq: '',
          contact: '',
          image1: '',
          image2: '',
          image3: '',
          image4: '',
          image5: '',
          description: '', // 描述
          video: '', // 视频链接
        },
        rules: {
          type: [
            {
              required: true,
              message: '请选择出租方式',
              trigger: 'change',
            },
          ],
          houseName: [
            {
              required: true,
              message: '请输入小区名称',
              trigger: 'blur',
            },
          ],
          houseArea: [
            {
              required: true,
              message: '请填写房屋面积',
              trigger: 'blur',
            },
            {
              validator: number,
              trigger: 'blur',
            },
          ],
          region: [
            {
              required: true,
              message: '请选择活动区域',
              trigger: 'change',
            },
          ],
          address: [
            {
              required: true,
              message: '请填写详细位置',
              trigger: 'blur',
            },
          ],
          price: [
            {
              required: true,
              message: '请选择租金',
              trigger: 'change',
            },
            {
              validator: number,
              trigger: 'blur',
            },
          ],
          mobile: [
            {
              required: true,
              message: '请填写联系方式',
              trigger: 'blur',
            },
            {
              validator: telPhone,
              trigger: 'blur',
            },
          ],
          contact: [
            {
              required: true,
              message: '请填写联系人名称',
              trigger: 'blur',
            },
          ],
          title: [
            {
              required: true,
              message: '请输入标题',
              trigger: 'blur',
            },
          ],
          description: [
            {
              required: true,
              message: '请输入租赁信息描述',
              trigger: 'blur',
            },
          ],
        },
        provinces: [], // 省
        city: [], // 市
        county: [], // 县/区
        fileList: [], // 上传的文件列表
        images: [],
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getProvince()
      })
    },
    methods: {
      /**
       * 获取省数据
       */
      getProvince () {
        this.axios
          .get('/region/getProvince')
          .then(response => {
            if (response.data.success) {
              this.provinces = response.data.result
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
      },
      /**
       * 获取市数据
       * @param {string} id 上级省的id
       */
      getCity (id) {
        this.form.city = ''
        this.form.area = ''
        this.county = []
        this.axios
          .get(`/region/getChildren/${id}`)
          .then(response => {
            this.city = response.data.result
          })
      },
      /**
       * 获取区县数据
       * @param {string} id 上级市id
       */
      getCounty (id) {
        this.form.area = ''
        this.axios
          .get(`/region/getChildren/${id}`)
          .then(response => {
            this.county = response.data.result
          })
      },
      /**
       * 提交租赁信息数据
       **/
      postData () {
        // 转换租赁信息格式为number类型
        this.form.type = Number.parseInt(this.form.type)

        for (let i = 1; i <= this.images.length; i++) {
          this.form[`image${i}`] = this.images[i - 1]
        }
        this.axios
          .post('/rent/post', this.form)
          .then(response => {
            // 表单提交成功后跳转到首页
            if (response.data.success) {
              this.$router.push('/index/index')
            } else {
              this.$message.error(response.data.message)
            }
          })
          .catch(error => this.$message.error(error))
      },
      /**
       * 上传前的照片格式和文件大小检查
       * @param {*} file 文件
       **/
      handleUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleSuccess (response) {
        this.images.push(response.result)
      },
      videoUpload (file) {
        const isMP4 = file.type === 'video/mp4'
        const isLt40M = file.size / 1024 / 1024 < 40

        if (!isMP4) {
          this.$message.error('上传视频只能是 MP4 格式!')
        }
        if (!isLt40M) {
          this.$message.error('上传图片大小不能超过 40MB!')
        }
        return isLt40M && isMP4
      },
      videoSuccess (response) {
        this.form.video = response.result
      },
      /**
       * 电话号码验证
       * @param {string} telNumber 电话号码
       */
      telPhone (telNumber) {
        const reg = /^1(3[0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|8[0-9]|9[89])\d{8}$/g
        return reg.test(telNumber)
      },
      formValidation () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.postData()
          } else {
            this.$message.error('请检查您的输入')
            return false
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .el-select {
    width: 150px;
    margin-right: 20px;
  }
</style>