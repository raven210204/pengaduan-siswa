const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /tanggapan --> end point untuk mengakses data tanggapan
app.get("/", (req,res) => {
    let sql = "select * from tanggapan"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                tanggapan: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /tanggapan --> end point untuk pencarian data tanggapan 
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from tanggapan where id_tanggapan like '%"+find+"%' or id_pengaduan '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                tanggapan: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /tanggapan/save --> end point untuk insert data tanggapan
app.post("/save", (req,res) => {
    let data = {
        id_tanggapan: req.body.id_tanggapan,
        id_pengaduan: req.body.id_pengaduan,
        tgl_tanggapan: req.body.tgl_tanggapan,
        isi_tanggapan: req.body.isi_tanggapan,
        id_admin: req.body.id_admin
    }
    let message = ""

    let sql = "insert into tanggapan set ?"
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

// POST: /tanggapan/update --> end point untuk update data tanggapan 
app.post("/update", (req,res) => {
    let data = [{
        id_tanggapan: req.body.id_tanggapan,
        id_pengaduan: req.body.id_pengaduan,
        tgl_tanggapan: req.body.tgl_tanggapan,
        isi_tanggapan: req.body.isi_tanggapan,
        id_admin: req.body.id_admin
    }, req.body.id_tanggapan]
    let message = ""

    let sql = "update tanggapan set ? where id_tanggapan = ?"
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

// DELETE: /tanggapan/:id_tanggapan --> end point untuk hapus data tanggapan
app.delete("/:id_tanggapan", (req,res) => {
    let data = {
        id_tanggapan : req.params.id_tanggapan
    }
    let message = ""
    let sql = "delete from tanggapan where ?"
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

module.exports = app