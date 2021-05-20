const mysql = require('mysql')

let pool = mysql.createPool({
  host:'192.168.180.41',
  port:'3306',
  user:'root',
  password:'admin123456',
  database:'test'
})

module.exports = {
  pool
}