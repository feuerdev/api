import express from "express"
import mysql from "mysql"

const router = express.Router()

router.get("/tarkov/items", function (req, res) {
  console.log("Get request on /tarkov/items : " + req)
  const connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  })
  connection.connect()
  connection.query('SELECT * FROM tarkov WHERE value > 1', function (error, results, fields) {
    if (error) {
      console.log(error)
    } else {
      let result = []
      for(let i = 0; i<results.length;i++) {
        let guid = results[i].guid
        let name = results[i].name
        let value = results[i].value
        let buyPrice = results[i].buyPrice
        result.push({guid:guid,name:name,value:value,buyPrice:buyPrice})
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result))
    }    
  })
  
  connection.end()
})

router.post("/tarkov/items/update-value", function(req, res) {
  let guid = req.body.guid
  let value = req.body.value
  console.log("requested change on "+guid+" value:"+value)
  const connection = mysql.createConnection({
    host     : 'mail.feuer.io',
    user     : 'api',
    password : 'OIjgRhdi9sTvtycSNIcO',
    database : 'api'
  })
  connection.connect()
  connection.query('UPDATE tarkov SET value= '+value+' WHERE guid LIKE "'+guid+'"', function (error, results, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      console.log("Successfully updated item")
      res.sendStatus(200)
    }
  })
})

router.post("/tarkov/items/update-buyprice", function(req, res) {
  let guid = req.body.guid
  let value = req.body.buyprice
  console.log("requested change on "+guid+" buyPrice:"+value)
  const connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  })
  connection.connect()
  connection.query('UPDATE tarkov SET buyPrice= '+value+' WHERE guid LIKE "'+guid+'"', function (error, results, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      console.log("Successfully updated item")
      res.sendStatus(200)
    }
  })
})

export default router