<template>
  <el-row type="flex" align="middle" class="register">
    <el-col :span="10" :offset="6" class="register-main">
      <el-row type="flex" justify="center" class="register_title">
        <el-col :span="24">
          <h2>用户注册</h2>
        </el-col>
      </el-row>
      <el-form :model="userInfo" ref="registerForm" label-width="30%" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userInfo.password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="userInfo.confirmPassword"/>
        </el-form-item>
        <el-form-item label="验证码" prop="verify">
          <el-input v-model="userInfo.verify" class="login-verify"/>
          <img :src="verifySrc" class="verify-img" @click="getVerify">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userRegister('registerForm')">立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>注册成功，是否立即登录？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="goToLogin">确 定</el-button>
  </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row';

  export default {
    components: {ElRow},
    name: 'register',
    data() {
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userInfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userInfo: {
          username: '',
          password: '',
          email: '',
          confirmPassword: '',
          verify: '',
          codeId: '',
        },
        verifySrc: '',
        rules: {
          email: [
            {
              required: true,
              message: '请输入邮件地址',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: 'blur,change',
            },
          ],
          username: [
            {
              required: true,
              message: '请输入您的用户名',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 10,
              message: '用户名长度在2到10个字符',
              trigger: 'blur,change',
            },
          ],
          password: [
            {
              required: true,
              message: '请输入您的登录密码',
              trigger: 'blur',
            },
            {
              min: 6,
              max: 16,
              message: '密码长度在6到16个字符',
              trigger: 'blur,change',
            },
          ],
          confirmPassword: [
            {
              required: true,
              message: '请确认您的登录密码',
              trigger: 'blur',
            },
            {
              validator: validatePass2,
              trigger: 'blur,change',
            },
          ],
          verify: [
            {
              required: true,
              message: '请输入验证码',
              trigger: 'blur',
            },
            {
              min: 4,
              max: 4,
              message: '验证码长度为4位',
              trigger: 'blur',
            },
          ],
        },
        dialogVisible: false,
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getVerify();
      });
    },
    methods: {
      /**
       * 用户注册
       */
      register() {
        this.axios
          .post('/user/regist', this.userInfo)
          .then(response => {
            // 用户注册成功后跳转到登录页面
            if (response.data.success) {
              this.dialogVisible = true;
            } else {
              this.$message.error(response.data['message']);
            }
          })
          .catch(error => console.error(error));
      },
      /**
       * 获取验证码
       */
      getVerify() {
        this.axios
          .get('/captcha/init')
          .then(response => {
            this.userInfo.codeId = response.data.result['captchaId'];
            this.verifySrc = `http://localhost:8888/captcha/draw?codeId=${this.userInfo.codeId}`;
          });
      },
      /**
       * 用户注册表单验证
       * @param {string} formName 表单名称
       */
      userRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register();
          } else {
            return false;
          }
        });
      },
      /**
       * 跳转到登录页面
       */
      goToLogin() {
        this.dialogVisible = false;
        this.$router.push('/login');
      },
    },
  };
</script>

<style lang="less" scoped>
  .el-input {
    width: 75%;
  }

  .register {
    height: 100vh;
    .register-main {
      box-shadow: 0 0 10px 2px #8a8989;
    }
  }

  .login-verify {
    width: 40%;
  }

  .verify-img {
    width: 30%;
    height: 40px;
    display: inline-block;
    float: right;
    margin-right: 25%;
  }

  .register_title {
    background-color: rgba(33, 33, 33, .88);
    color: white;
    height: 8vh;
    margin-bottom: 3vh;
    text-align: center;
    h2 {
      height: 8vh;
      line-height: 8vh;
      margin: 0;
    }
  }
</style>