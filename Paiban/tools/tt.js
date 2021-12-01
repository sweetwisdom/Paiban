let target = [
  {
    id: "1-07-01",
    personid: 1,
    month: 07,
    day: 01,
    project: "a1",
    reamark: ""
  },
  {
    id: "2-07-01",
    personid: 2,
    month: 07,
    day: 01,
    project: "a2",
    reamark: ""
  },
  {
    id: "3-07-01",
    personid: 3,
    month: 07,
    day: 01,
    project: "a3",
    reamark: ""
  },
  {
    id: "4-07-01",
    personid: 4,
    month: 07,
    day: 01,
    project: "a4",
    reamark: ""
  },
  { id: "5-07-01", personid: 5, month: 07, day: 01, project: 0, reamark: "" },
  {
    id: "6-07-01",
    personid: 6,
    month: 07,
    day: 01,
    project: "a5",
    reamark: "调休"
  },
  {
    id: "7-07-01",
    personid: 7,
    month: 07,
    day: 01,
    project: "a5",
    reamark: "事假"
  },
  {
    id: "8-07-01",
    personid: 8,
    month: 07,
    day: 01,
    project: "a5",
    reamark: "病假"
  },
  {
    id: "9-07-01",
    personid: 9,
    month: 07,
    day: 01,
    project: "a6",
    reamark: ""
  },
  {
    id: "10-07-01",
    personid: 10,
    month: 07,
    day: 01,
    project: "a6",
    reamark: ""
  }
];

let project = [
  { title: "循环+团队预约", name: "a1", multiply: false },
  { title: "服务中心", name: "a2", multiply: false },
  { title: "奖品兑换", name: "a3", multiply: false },
  { title: "VR讲解", name: "a4", multiply: false },
  { title: "调休", name: "a5", multiply: true },
  { title: "其他在职", name: "a6", multiply: true }
];
//   let outPut = {
//     day: null,
//     a1: "",
//     a2: "",
//     a3: "",
//     a4: "",
//     a5: [],
//     a6: []
//   };
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
getDay(target, project);
