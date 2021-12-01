module.exports = {
  /**
   * 接收工具函数 将人员日期排班 转换成周视图
   * @param {Array} array  人员日期排班数组
   * @param {Array } project  项目明细数组
   * @returns
   */
  receiveTool(array, project) {
    let dayList = []
    let outPut = []
    array.forEach((el) => {
      let day = el.date
      if (!dayList.includes(day)) {
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
    return outPut
  },
  /**
   * 发送工具函数 将周视图转换成人员日期排班
   * @param {Array} array  周视图数组
   */
  postTool(array) {
    let outPut = []
    array.forEach((el) => {
      let day
      let target = el
      for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
          const element = target[key]
          if (key == 'day') {
            day = element
            continue
          }
          let item = {}
          if (typeof element == 'object') {
            element.forEach((eve) => {
              item = {
                euid: eve,
                day,
                post_id: key,
              }
              outPut.push(item)
            })
            continue
          }
        }
      }
    })
    console.log(outPut)
    console.log(outPut.length)
  },
  /**
   * 数组布尔(集合)运算 比较差异
   * @param {array} a old 旧数组
   * @param {array} b new 新数组
   * @returns 返回三个数组  addDate 新增的部分 reDate 减少的部分 comDate 公共的部分
   */
  getArrayDif(a, b) {
    //  old,new
    let n1 = []
    let n2 = []
    let m2 = []
    for (let index = 0; index < b.length; index++) {
      const element = b[index]
      if (a.includes(element)) {
        n1.push(element)
      } else {
        n2.push(element)
      }
    }
    for (let index = 0; index < a.length; index++) {
      const element = a[index]
      if (!b.includes(element)) {
        m2.push(element)
      }
    }
    //  m2 减去 n2 新增
    //   console.log(n1, n2, m2);
    return { addDate: n2, reDate: m2, comDate: n1 }
  },
}
