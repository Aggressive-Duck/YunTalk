const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '100.107.63.58',
  user: 'kuan',
  password: '',
  database: 'yuntalk',
  port: 3306,
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
