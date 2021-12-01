// 这是人数 假设有10个人
let peopel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 可为对象
let person = {
  id: 1,
  restday: [1, 15, 22, 32], // 休息的天数数组,休息天数不排班 可为对象,可备注理由
  workday: [
    //工作排班的数组,每天一项 projet 为0 表示调休,remark: 表示调休理由
    {
      day: 1,
      month: 07,
      project: a1
    },

    {
      day: 2,
      month: 07,
      project: 0,
      remark: "生病调休"
    }
  ]
};
//  这是需要的项目 四个项目可配置 加一个在职 加一个 调休
let form1 = [
  { title: "循环+团队预约", name: "a1", multiply: false },
  { title: "服务中心", name: "a2", multiply: false },
  { title: "奖品兑换", name: "a3", multiply: false },
  { title: "VR讲解", name: "a4", multiply: false },
  { title: "其他在职", name: "a5", multiply: true },
  { title: "调休", name: "a6", multiply: true }
];

// 这是每天的工作情况
let everyDay = [
  {
    day: 1,
    a1: "1",
    a2: "2",
    a3: "3",
    a4: "4",
    a5: "5,6,7,8",
    a6: "9,10",
    workPeople: "1,2,3,4,9,10"
  }
];
