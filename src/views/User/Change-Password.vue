<template>
  <el-row>
    <el-col :span="8" :offset="8">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="form.password"/>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="form.newPass"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Change-Password',
    data() {
      return {
        form: {
          password: '',
          newPass: '',
          token: sessionStorage.getItem('token'),
        },
        rules: {
          password: [
            {
              required: true,
              message: '请填写密码',
              trigger: 'blur',
            },
            {
              min: 6,
              max: 16,
              message: '请填写密码',
              trigger: 'blur',
            },
          ],
        },
      };
    },
    methods: {
      /**
       * 修改密码
       */
      modifyPass() {
        this.axios
          .post('/user/modifyPass', this.form)
          .then(response => {
            if (response.data.success) {
              this.$router.push('/index/index');
            } else {
              this.$message.error(response.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.modifyPass();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style scoped>

</style>