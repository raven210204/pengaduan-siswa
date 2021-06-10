const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const md5 = require("md5") //mengubah password menjadi format md5 
const db = require("../config") //import konfigurasi database
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /admin --> end point untuk mengakses data admin
app.get("/", (req,res) => {
    let sql = "select * from admin"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                admin: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /admin --> end point untuk pencarian data admin
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from admin where id_admin like '%"+find+"%' or nip '%"+find+"%' or username like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                admin: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /jurusan/save --> end point untuk insert data pegawai
app.post("/register", (req,res) => {
    let data = {
        id_admin: req.body.id_admin,
        nip: req.body.nip,
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        telp: req.body.telp
    }
    let message = ""

    let sql = "insert into admin set ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row inserted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// POST: /admin/update --> end point untuk update data admin 
app.post("/update", (req,res) => {
    let data = [{
        id_admin: req.body.id_admin,
        nip: req.body.nip,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        telp: req.body.telp
    }, req.body.id_admin]
    let message = ""

    let sql = "update admin set ? where id_admin = ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row updated"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// DELETE: /admin/:id_admin --> end point untuk hapus data pegawai
app.delete("/:id_admin", (req,res) => {
    let data = {
        id_admin : req.params.id_admin
    }
    let message = ""
    let sql = "delete from admin where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// endpoint login user (authentication)
app.post("/auth", (req, res) => {
    // tampung username dan password
    let param = [
        req.body.username, //username
        md5(req.body.password) // password
    ]
    
    // create sql query
    let sql = "select * from admin where username = ? and password = ?"

    // run query
    db.query(sql, param, (error, result) => {
        if (error) throw error

        // cek jumlah data hasil query
        if (result.length > 0) {
            // user tersedia
            let payload = JSON.stringify(result[0].id_admin)
            // generate token
            let token = jwt.sign(payload, SECRET_KEY) // generate token
            res.json({
                logged: true,
                data: result,
                token: token
            })
        } else {
            // user tidak tersedia
            res.json({
                message: "Invalid username/password"
            })
        }
    })
})

module.exports = app