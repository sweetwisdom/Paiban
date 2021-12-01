let aa = require("./inpput");
let project = [
  { title: "循环+团队预约", name: "a1", multiply: false },
  { title: "服务中心", name: "a2", multiply: false },
  { title: "奖品兑换", name: "a3", multiply: false },
  { title: "VR讲解", name: "a4", multiply: false },
  { title: "调休", name: "a5", multiply: true },
  { title: "其他在职", name: "a6", multiply: true }
];
// console.log(aa);
//  函数一 将数据按组进行分割
function groupeBynone(array) {
  let dayList = [];
  let output = [];
  array.forEach(el => {
    let day = el.month + "-" + el.day;
    let lengths = dayList.length;
    if (!dayList.includes(day)) {
      //    不存在 进行操作
      dayList.push(day);

      output[lengths] = [];
      output[lengths].push(el);

      return;
    }

    output[lengths - 1].push(el);
  });
  console.log(output, dayList);
  return output;
}
// 函数二 按照日期进行拆分
function getDay(array, project) {
  let outPut = {
    day: null
  };
  //  初始化 outPut
  project.forEach(el => {
    if (el.multiply) {
      outPut[el.name] = [];
    } else {
      outPut[el.name] = "";
    }
  });
  outPut.day = array[0].month + array[0].day;
  console.log(outPut);
  //  初始化完毕

  array.forEach(el => {
    project.forEach(p => {
      if (el.project == p.name) {
        if (p.multiply) {
          outPut[p.name].push(el.personid);
        } else {
          outPut[p.name] = el.personid;
        }
      }
    });
  });

  console.log(outPut);
  return outPut;
}
// 函数3 按照日期分割出日期
function groupebyday(array, project) {
  let dayList = [];
  let outPut = [];
  array.forEach(el => {
    let day = el.month + "-" + el.day;

    if (!dayList.includes(day)) {
      //    不存在 初始化
      dayList.push(day);
      outPut.push({
        day
      });
    }
    let lengths = dayList.length - 1;
    project.forEach(p => {
      if (el.project == p.name) {
        let target = outPut[lengths][p.name];
        if (p.multiply) {
          //  多选 进行初始化
          if (!target) {
            target = [];
          }
          target.push(el.personid);
        } else {
          target = el.personid;
        }

        // outPut[lengths][p.name] = target;
      }
    });
  });
  console.log(outPut);
  return outPut;
}
// let fs = require("fs");
// let out = groupebyday(aa, project);
// fs.writeFileSync("./target.json", JSON.stringify(out));
