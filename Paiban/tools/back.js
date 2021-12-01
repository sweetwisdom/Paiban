let array = require("./target.json");
let project = [
  { title: "循环+团队预约", name: "a1", multiply: false },
  { title: "服务中心", name: "a2", multiply: false },
  { title: "奖品兑换", name: "a3", multiply: false },
  { title: "VR讲解", name: "a4", multiply: false },
  { title: "调休", name: "a5", multiply: true },
  { title: "其他在职", name: "a6", multiply: true }
];
function retoreArray(array) {
  let outPut = [];
  array.forEach(el => {
    let month, day;
    let target = el;
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        // console.log(key);
        const element = target[key];
        if (key == "day") {
          // 排除day
          let culDate = element.split("-");
          month = culDate[0];
          day = culDate[1];
          continue;
          //   console.log(culDate);
        }
        let item = {};
        // 排除array
        if (typeof element == "object") {
          element.forEach(eve => {
            item = {
              id: eve + "-" + month + "-" + day,
              personid: eve,
              month,
              day,
              project: key
            };
            outPut.push(item);
          });
          //   这是数组
          //   console.log(element);
          continue;
        }

        item = {
          id: element + "-" + month + "-" + day,
          personid: element,
          month,
          day,
          project: key
        };
        outPut.push(item);
        //   执行序列
      }
    }
  });
  console.log(outPut);
  console.log(outPut.length);
}

retoreArray(array);
