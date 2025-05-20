const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'YunTalk',
  port: 3306              

})

connection.connect()

connection.query('SELECT * FROM `Users` WHERE userid=1', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0])
})

connection.end()
