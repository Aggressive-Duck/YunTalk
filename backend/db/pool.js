const mysql = require('mysql')
const pool = mysql.createPool({
  host: '100.107.63.58',
  user: 'kuan',
  password: '',
  database: 'yuntalk',
  port: 3306,
  connectionLimit: 10,
  charset: 'utf8mb4',
})


pool.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

module.exports = pool