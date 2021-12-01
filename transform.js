let aa = require('./input')
let project = require('./project.json')

function groupebyday(array, project) {
  let dayList = []
  let outPut = []
  array.forEach((el) => {
    let day = el.date

    if (!dayList.includes(day)) {
      //    不存在 初始化
      dayList.push(day)
      outPut.push({
        day,
      })
    }
    let lengths = dayList.length - 1
    project.forEach((p) => {
      if (el.post_id == p.name) {
        let target = outPut[lengths][p.name]
        if (!target) {
          target = []
        }
        target.push(el.euid)
        outPut[lengths][p.name] = target
      }
    })
  })
  console.log(outPut)
  return outPut
}

let out = groupebyday(aa, project)
let fs = require('fs')
fs.writeFileSync('./target.json', JSON.stringify(out))
