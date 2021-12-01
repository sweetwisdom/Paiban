let aa = require('./input')
let project = require('./project.json')
let { receiveTool, postTool } = require('./workTool')

let target = receiveTool(aa, project)
postTool(target)

// console.log(target)
