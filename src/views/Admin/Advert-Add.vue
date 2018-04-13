<template>
  <el-row>
    <el-col :span="10">
      <el-form ref="advert" :model="advert" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="advert.title"></el-input>
        </el-form-item>
        <el-form-item label="广告类型">
          <el-radio-group v-model="advert.type">
            <el-radio label="0">站内</el-radio>
            <el-radio label="1">站外</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联Id" v-if="advert.type === '0'" prop="relateId">
          <el-input v-model="advert.relateId"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="redirectUrl" v-else>
          <el-input v-model="advert.redirectUrl"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" :rows="5" v-model="advert.description"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8888/image/upload"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload">
            <img v-if="advert.picUrl" :src="advert.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formValidation">发布广告</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Advert',
    data() {
      return {
        advert: {
          title: '', // 标题
          description: '', // 描述
          relateId: '', // 关联Id
          redirectUrl: '', // 跳转链接
          type: '0', // 广告类型 0站内 1外链
          picUrl: '',
        },
        rules: {
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
              message: '请输入描述',
              trigger: 'blur',
            },
          ],
          relateId: [
            {
              required: true,
              message: '请输入关联Id',
              trigger: 'blur',
            },
          ],
          redirectUrl: [
            {
              required: true,
              message: '请输入跳转链接',
              trigger: 'blur',
            },
          ],
        },
      };
    },
    methods: {
      /**
       * 发布轮播图数据
       */
      updateAdverts() {
        this.axios
          .post('/advert/save', this.advert)
          .then(response => {
            if (response.data.success) {
              this.$message.success('发布成功');
              const timer = window.setTimeout(() => {
                this.$router.push('/admin/advert');
                clearTimeout(timer);
              }, 1000);
            } else {
              this.$message.error(response.data.message);
            }
          })
          .catch(error => this.$message.error(error));
      },
      handleSuccess(res) {
        this.advert.picUrl = res.result;
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      formValidation() {
        this.$refs['advert'].validate((valid) => {
          if (valid) {
            this.updateAdverts();
          } else {
            this.$message.error('请检查您的输入');
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>