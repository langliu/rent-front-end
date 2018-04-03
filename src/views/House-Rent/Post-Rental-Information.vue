<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-row>
        <el-col :span="24">
          <h2>租赁发布</h2>
        </el-col>
      </el-row>
      <el-form ref="form" v-model="form" :rules="rules" label-width="100px">
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
        <el-form-item label="地区" >
          <el-select v-model="form.province" placeholder="省" @change="getCity($event)">
            <el-option v-for="item in provinces"
                       :key="item.regionId"
                       :value="item.regionId"
                       :label="item.regionName">
            </el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="市" @change="getCounty($event)">
            <el-option v-for="item in city"
                       :key="item.regionId"
                       :value="item.regionId"
                       :label="item.regionName">
            </el-option>
          </el-select>
          <el-select v-model="form.area" placeholder="区/县">
            <el-option v-for="item in county"
                       :key="item.regionId"
                       :value="item.regionId"
                       :label="item.regionName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="租金">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="File">
          <el-upload
              class="upload-demo"
              action="http://localhost:8888/image/upload"
              :on-success="handleSuccess"
              :before-upload="handleUpload"
              :file-list="fileList"
              :limit="3"
              :multiple="true"
              list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，图片最多3张</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postData">确认发布</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Post-Rental-Information',
    data() {
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
          description: '', // 描述
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
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
        },
        provinces: [], // 省
        city: [], // 市
        county: [], // 县/区
        fileList: [], // 上传的文件列表
        images: [],
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getProvince();
      });
    },
    methods: {
      /**
       * 获取省数据
       */
      getProvince() {
        this.axios
          .get('/region/getProvince')
          .then(response => {
            console.log(response);
            if (response.data.success) {
              this.provinces = response.data.result;
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      /**
       * 获取市数据
       * @param {string} id 上级省的id
       */
      getCity(id) {
        this.form.city = '';
        this.form.area = '';
        this.county = [];
        this.axios
          .get(`/region/getChildren/${id}`)
          .then(response => {
            this.city = response.data.result;
          });
      },
      /**
       * 获取区县数据
       * @param {string} id 上级市id
       */
      getCounty(id) {
        this.form.area = '';
        this.axios
          .get(`/region/getChildren/${id}`)
          .then(response => {
            this.county = response.data.result;
          });
      },
      postData() {
        this.form.type = Number.parseInt(this.form.type);
        if (this.images.length === 1) {
          this.form.image1 = this.images[0];
        } else if (this.images.length === 2) {
          this.form.image1 = this.images[0];
          this.form.image2 = this.images[1];
        } else {
          this.form.image1 = this.images[0];
          this.form.image2 = this.images[1];
          this.form.image3 = this.images[2];
        }
        this.axios
          .post('/rent/post', this.form)
          .then(response => {
            console.log(response);
          })
          .catch(error => this.$message.error(error));
      },
      handleUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        this.images.push(response.result);
        console.log(fileList);
      },
    },
  };
</script>

<style lang="less" scoped>
  .el-select {
    width: 150px;
    margin-right: 20px;
  }
</style>