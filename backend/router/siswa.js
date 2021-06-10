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

// GET: /siswa --> end point untuk mengakses data siswa
app.get("/", (req,res) => {
    let sql = "select * from siswa"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                siswa: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /siswa --> end point untuk pencarian data siswa 
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from siswa where id_siswa like '%"+find+"%' or nisn '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                siswa: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /siswa/save --> end point untuk insert data siswa
app.post("/register", (req,res) => {
    let data = {
        id_siswa: req.body.id_siswa,
        nisn: req.body.nisn,
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        telp: req.body.telp
    }
    let message = ""

    let sql = "insert into siswa set ?"
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

// POST: /siswa/update --> end point untuk update data siswa
app.post("/update", (req,res) => {
    let data = [{
        id_siswa: req.body.id_siswa,
        nisn: req.body.nisn,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        telp: req.body.telp
    }, req.body.id_siswa]
    let message = ""

    let sql = "update siswa set ? where id_siswa = ?"
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

// DELETE: /siswa/:id_siswa --> end point untuk hapus data siswa
app.delete("/:id_siswa", (req,res) => {
    let data = {
        id_siswa : req.params.id_siswa
    }
    let message = ""
    let sql = "delete from siswa where ?"
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

// POST: /siswa/login --> end point untuk login siswa
app.post("/login", (req, res) => {
    // tampung username dan password
    let param = [
        req.body.username, //username
        md5(req.body.password) // password
    ]
    
    // create sql query
    let sql = "select * from siswa where username = ? and password = ?"

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