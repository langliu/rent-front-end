<template>
  <el-row type="flex" align="middle" class="login">
    <el-col :span="8" :offset="8" class="login-main">
      <el-row type="flex" justify="center" class="login_title">
        <el-col :span="24">
          <h2>用户登录</h2>
        </el-col>
      </el-row>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="30%">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username" class="login-input" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" class="login-input" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="验证码" prop="verify">
          <el-input v-model="form.verify" class="login-verify"/>
          <img :src="verifySrc" class="verify-img" @click="getVerify">
        </el-form-item>
        <el-form-item>
          还没有账号？ <span @click="toToRegister">立即注册</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="userLogin('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row';

  export default {
    components: {ElRow},
    name: 'login',
    data() {
      return {
        form: {
          username: '', // 用户名
          password: '', // 登陆密码
          verify: '', // 登录验证码
          codeId: '', // 验证码
        },
        verifySrc: '',
        rules: {
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
              trigger: 'blur',
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
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getVerify();
      });
    },
    methods: {
      /**
       * 用户登录
       */
      login() {
        this.axios
          .post('/user/login', this.form)
          .then(response => {
            // 用户登录成功后跳转到网站首页
            if (response.data.success) {
              sessionStorage.setItem('username', response.data.result.username);
              sessionStorage.setItem('avatar', response.data.result.avatar);
              sessionStorage.setItem('token', response.data.result['token']);
              if (response.data.result.type === 1) {
                this.$router.push('/admin');
              } else {
                this.$router.push('/index/index');
              }
            } else {
              this.$message.error(response.data['message']);
            }
          })
          .catch(error => console.error(error));
      },
      /**
       * 跳转用户注册页面
       */
      toToRegister() {
        this.$router.push('/register');
      },
      /**
       * 获取验证码
       */
      getVerify() {
        this.axios
          .get('/captcha/init')
          .then(response => {
            this.form.codeId = response.data.result['captchaId'];
            this.verifySrc = `http://localhost:8888/captcha/draw?codeId=${this.form.codeId}`;
          });
      },
      /**
       * 登录表单验证
       * @param {string} formName 要验证的表单名称
       */
      userLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .login {
    background: url("../../assets/images/sylwia-pietruszka-218324-unsplash.jpg") no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    .login-main {
      background-color: white;
      box-shadow: 0 0 10px 2px #8a8989;
      .login_title {
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
    }
  }

  .login-input {
    width: 75%;
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

  .login-btn {
    width: 75%;
  }

  .el-form-item {
    span {
      color: #4595fa;
    }
  }
</style>