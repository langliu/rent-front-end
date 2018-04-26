<template>
<el-row>
  <el-col :span="22" :offset="1">
    <el-tabs>
      <el-tab-pane label="个人信息">
        <el-form ref="form" :model="user" label-width="80px" :rules="userRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" :disabled="disabledChange"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="telPhone">
            <el-input v-model="user.telPhone" :disabled="disabledChange"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="user.sex" :disabled="disabledChange">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" v-model="user.description" :disabled="disabledChange"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeUserInfo" v-if="disabledChange===true">修改资料</el-button>
            <el-button type="primary" @click="submitForm" v-if="disabledChange===false">确认修改</el-button>
            <el-button @click="changeUserInfo" v-if="disabledChange===false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="form.newPass" placeholder="请输入新密码"/>
          </el-form-item>
          <el-form-item label="新密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmNewPass" placeholder="请确认新密码"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: 'Personal-Center',
  data () {
    const telPhone = (rule, value, callbacks) => {
      if (value !== '') {
        callbacks()
      } else if (!this.telPhone(value)) {
        callbacks(new Error('请输入正确的电话号码'))
      } else {
        callbacks()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else if (this.form.confirmNewPass !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        address: null, // 用户地址
        avatar: null, // 头像
        createBy: null, //
        createTime: null, // 注册时间
        description: null, // 个人描述
        email: null, // 邮箱
        id: null, // id
        newPass: null, // 新密码
        nickName: null, // 昵称
        password: null, // 登录密码
        sex: '', // 性别
        status: null, //
        telPhone: null, // 电话
        token: '', // token
        type: null, // 0普通用户 1管理员
        updateBy: null,
        updateTime: null,
        username: null // 用户名
      },
      form: {
        password: '',
        newPass: '',
        confirmNewPass: '',
        token: sessionStorage.getItem('token')
      },
      rules: {
        password: [
          // {
          //   required: true,
          //   message: '请填写密码',
          //   trigger: 'blur',
          // },
          {
            min: 6,
            max: 16,
            message: '密码长度为6-16位',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          // {
          //   required: true,
          //   message: '请确认您的新密码',
          //   trigger: 'blur',
          // },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      },
      userRules: {
        username: [
          {
            required: true,
            message: '请输入您的用户名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '用户名长度在2到10个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入您的登录密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码长度在6到16个字符',
            trigger: 'blur,change'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮件地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        telPhone: [
          {
            validator: telPhone,
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      },
      disabledChange: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getUserInfo()
    })
  },
  methods: {
    /**
     * 获取用户信息
     */
    getUserInfo () {
      this.axios
        .get(`/user/info/${sessionStorage.getItem('token')}`)
        .then(response => {
          if (response.data.success) {
            this.user = response.data.result
            this.user.sex = this.user.sex ? this.user.sex.toString() : ''
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch(error => console.error(error))
    },
    /**
     * 使修改个人信息表单可用
     */
    changeUserInfo () {
      this.disabledChange = !this.disabledChange
      this.getUserInfo()
    },
    submitForm () {
      const postData = {
        token: sessionStorage.getItem('token'),
        username: this.user.username,
        email: this.user.email,
        avatar: this.user.avatar,
        description: this.user.description,
        sex: this.user.sex,
        telPhone: this.user.telPhone
      }
      this.axios
        .post('/user/edit', postData)
        .then(response => {
          if (response.data.success) {
            this.changeUserInfo()
            this.getUserInfo()
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch(error => this.$message.error(error))
    },
    /**
     * 修改密码
     */
    modifyPass () {
      this.axios
        .post('/user/modifyPass', this.form)
        .then(response => {
          if (response.data.success) {
            this.$router.push('/index/index')
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.modifyPass()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: center;
}
</style>
