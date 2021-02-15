import express from "express"
import fs from "fs"
import path from "path"

const FOLDER_OUT = path.join(__dirname, "../out/")
const FOLDER_OUT_DDNS = path.join(FOLDER_OUT, "ddns/")
const FILE_OUT_DDNS_TXT = "ddns.txt"

const router = express.Router()

//Beispiel: http://api.feuer.io/update?username=<username>&password=<pass>&domain=<domain>&ipaddr=<ipaddr>
router.get("/update", function (req, res) {
  if(req.query) {
    const key = req.query["password"] as string
    const domain = req.query["domain"] as string
    const user = req.query["username"] as string
    const ip = req.query["ipaddr"] as string

    //Check if values are set
    if(key && domain && user && ip) {
      //check if values are valid
      if(user === process.env.API_USER && key === process.env.API_KEY && domain == process.env.API_DDNS_DOMAIN) {
        console.log("Valid DDNS update request from user: " + user)
        //Write IP to /out/
        fs.mkdir(FOLDER_OUT, function (err) {
          if(err) {
            console.log(err)
          }
          fs.mkdir(FOLDER_OUT_DDNS, function (err) {
            if(err) {
              console.log(err)
            }
            fs.writeFile(FOLDER_OUT_DDNS + FILE_OUT_DDNS_TXT, ip, function (err) {
              if(err) {
                console.log(err)
              }
              console.log("Successfully set new IP to: " + ip)
              console.log("Update has two minutes TTL")
              res.status(202).send()
            })
          })
        })
      } else res.status(403).send()
    } else res.status(400).send()
  } else res.status(400).send()
})

export default router