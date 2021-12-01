let array = require('./target.json')
let project = require('./project.json')
function retoreArray(array) {
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
}

retoreArray(array)
