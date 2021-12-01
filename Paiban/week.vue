<template>
  <div style="width:1200px;">
    <!-- 展示排班表格 -->
    <table class="text-center w-100 table">
      <tr>
        <th class="first">日期</th>
        <th
          class="px-4"
          v-for="(item, i) in topList"
          :key="i"
          :style="{ width: item.width }"
        >
          {{ item.title }}
        </th>
        <th class="first">操作</th>
      </tr>
      <tr v-for="(items, m) in dayList" :key="m">
        <td class="first">
          <p>{{ items.day }}</p>
        </td>

        <td class="py-2 " v-for="(item, i) in topList" :key="i">
          {{ getPersonName(items, item.name) }}
        </td>
        <!-- 排班按钮 -->
        <td style="width: 120px;">
          <el-button type="primary" class="cc" @click="changeItem(items, m)">
            开始排班</el-button
          >
        </td>
      </tr>
    </table>

    <!-- 编辑框 -->
    <el-dialog
      :title="'开始排班' + ' ' + editData.day"
      :visible="dialogVisible"
      width="900px"
      :before-close="dialogBeforeClose"
    >
      <div v-if="dialogVisible">
        <el-form label-width="121px">
          <el-form-item
            v-for="(item, i) in topList"
            :key="i"
            :label="item.title"
          >
            <el-select
              :multiple="item.multiply"
              style="width: 500px;"
              :disabled="item.name == 'a5'"
              v-model="editData[item.name]"
              @focus="changeBefore(editData[item.name])"
              @remove-tag="clearDay"
              placeholder="请选择"
              @change="changeAfter(editData[item.name])"
            >
              <el-option
                v-for="tem in person"
                :key="tem.id"
                :label="tem.name"
                :value="tem.id"
                :disabled="checkdisable(tem.id)"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curItem: "",
      leftList: ["日", "一", "二", "三", "四", "五", "六"],
      dayList: require("./tools/target.json"),
      person: require("./person"),
      dialogVisible: false,
      editData: {},
      oldVal: null,
      topList: [
        { width: "121px", title: "循环+团队预约", name: "a1", multiply: false },
        { width: "121px", title: "服务中心", name: "a2", multiply: false },
        { width: "121px", title: "奖品兑换", name: "a3", multiply: false },
        { width: "121px", title: "VR讲解", name: "a4", multiply: false },
        { width: "121px", title: "其他在职", name: "a6", multiply: true },
        { title: "调休", name: "a5", multiply: true },
        { width: "121px", title: "年假", name: "a0", multiply: true }
      ]
    };
  },
  props: {},
  watch: {},
  mounted() {
    console.log(this.person);
  },
  created() {},

  methods: {
    changeBefore(val) {
      this.oldVal = JSON.parse(JSON.stringify(val));

      console.log(this.oldVal, "改变以前的值");
    },
    clearDay(val) {
      if (this.oldVal) {
        return;
      }
      console.log("1111,删除了", val);
      this.editData.a5.push(val);
    },
    dialogBeforeClose() {
      this.dialogVisible = false;
      console.log("关闭了");
      //   this.dayList[this.curItem] = this.editData;
      this.curItem = null;
      this.editData = {};
    },
    changeItem(a, m) {
      this.editData = a;
      console.log(a, m);
      //   this.editData = JSON.parse(JSON.stringify(a));
      this.dialogVisible = true;
      this.curItem = m;

      console.log(m);
    },
    checkdisable(val) {
      let select = this.editData.a5;
      if (select && select.includes(val)) {
        return false;
      }
      return true;
    },
    //  获取用户名称
    getPersonName(a, n) {
      let input = a[n];

      if (typeof input != "object") {
        let aa = this.person.find(e => e.id == input);
        // console.log(aa);

        return aa ? aa.name : "";
      } else {
        let name = input.map(element => {
          let aa = this.person.find(e => e.id == element);
          return aa.name;
        });
        return name.join(",");
      }
    },
    getDif(a, b) {
      //  old,new
      let n1 = [];
      let n2 = [];
      let m2 = [];
      for (let index = 0; index < b.length; index++) {
        const element = b[index];
        if (a.includes(element)) {
          n1.push(element);
        } else {
          n2.push(element);
        }
      }
      for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (!b.includes(element)) {
          m2.push(element);
        }
      }
      //  m2 减去 n2 新增
      //   console.log(n1, n2, m2);
      return { addDate: n2, reDate: m2 };
    },
    changeAfter(val) {
      if (typeof val == "object") {
        console.log("多选触发");
        if (!this.oldVal) {
          return;
        }
        //  每选择一个就调用一次 之后更新old值

        let { addDate, reDate } = this.getDif(this.oldVal, val);
        console.log(addDate, reDate);
        this.oldVal = JSON.parse(JSON.stringify(val));
        if (reDate[0]) {
          this.editData.a5.push(reDate[0]);
        }
        if (addDate[0]) {
          let tem = this.editData.a5.filter(e => {
            return e != addDate[0];
          });
          this.$nextTick(() => {
            this.editData.a5 = tem;
          });
        }
        // let aa = this.oldVal.map();
        // console.log(val);
      } else {
        console.log(this.oldVal, "删除前添加");
        if (this.oldVal) {
          this.editData.a5.push(this.oldVal);
        }

        let tem = this.editData.a5.filter(e => {
          return e != val;
        });
        this.$nextTick(() => {
          this.editData.a5 = tem;
          this.oldVal = null;
        });

        console.log(val, "new");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  th {
    height: 60px;
    border-bottom: #2c313c 1px solid;
    border-right: #2c313c 1px solid;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    letter-spacing: 0;
    text-align: cente;
    padding: 2px 10px;
    background-color: #fbf7f3;
  }
  .first {
    color: #b78b52 !important;
    font-weight: bold;
    width: 100px;
  }
  td {
    height: 70px;
    border-bottom: #2c313c 1px solid;
    border-right: #2c313c 1px solid;
    background-color: #ffffff;
    font-size: 14px;
  }
}
</style>
<!-- {{items[item.name}} -->
<!-- <el-select
            :multiple="typeof items[item.name] == 'object'"
            clearable
            style="width: 120px;"
            v-model="items[item.name]"
            placeholder="请选择"
            @change="hasChange"
          >
            <el-option
              v-for="item in person"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select> -->
