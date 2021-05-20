const {pool} = require('./pool')

// 查询所有的用户
let findUser = (callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'select * from user_info'
          connection.query(sql,(err,result)=>{
              if(err) {
                  console.log(err)
              } else {
                  callback(result)
                  connection.release()
                  connection.destroy()
              }
          })
      }
  })
}

// 根据id查询用户信息
let findById = (id,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'select * from user_info where id=?'
          connection.query(sql,[id],(err,result)=>{
              if(err) {
                  console.log(err)
              } else {
                  callback(result)
                  connection.release()
                  connection.destroy()
              }
          })
      }
  })
}

// 新增用户或修改用户
let saveUser = (obj,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          if(JSON.parse(obj).id) {
              // 修改
              let sql = 'update user_info set name=?,age=?,gender=? where id=?'
              connection.query(sql,[JSON.parse(obj).name,JSON.parse(obj).age,JSON.parse(obj).gender,JSON.parse(obj).id],(err,result)=>{
                  if(err) {
                      console.log(err)
                  } else {
                      callback(result)
                      connection.release()
                      connection.destroy()
                  }
              })
          } else {
              // 保存
              let sql = 'insert into user_info(id,name,age,gender) values(?,?,?,?)'
              connection.query(sql,[null,JSON.parse(obj).name,JSON.parse(obj).age,JSON.parse(obj).gender],(err,result)=>{
                  if(err) {
                      console.log(err)
                  } else {
                      callback(result)
                      connection.release()
                      connection.destroy()
                  }
              })
          }
      }
  })
}

// 根据id删除用户
let deleteById = (id,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'delete from user_info where id = ?'
          connection.query(sql,[id],(err,result)=>{
              if(err) {
                  console.log(err)
              } else {
                  callback(result)
                  connection.release()
                  connection.destroy()
              }
          })
      }
  })
}

module.exports = {
  findUser,
  findById,
  saveUser,
  deleteById
}