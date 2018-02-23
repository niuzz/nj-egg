/******************************************
 *  Author : niuzz niuzz@hotmail.com   
 *  Created On : Fri Feb 23 2018
 *  File : excel.js
 *******************************************/
XLSX = require('xlsx')
fs = require('fs')
const workbook = XLSX.readFile(__dirname+'/a.xlsx')
// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
const worksheet = workbook.Sheets[sheetNames[0]]
let json = XLSX.utils.sheet_to_json(worksheet)
let t = JSON.stringify(json)
fs.writeFileSync(__dirname +'/jwj.json', t)
console.log('-----------------------')
console.log('写入完成，慢慢享用')
console.log('-----------------------')





