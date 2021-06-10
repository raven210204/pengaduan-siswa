const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /pengaduan --> end point untuk mengakses data admin
app.get("/", (req,res) => {
    let sql = "select * from pengaduan"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                pengaduan: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /pengaduan --> end point untuk pencarian data pengaduan 
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from pengaduan where id_pengaduan like '%"+find+"%' or id_siswa '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                pengaduan: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /pengaduan/save --> end point untuk insert data pengaduan
app.post("/save", (req,res) => {
    let data = {
        id_pengaduan: req.body.id_pengaduan,
        tgl_pengaduan: req.body.tgl_pengaduan,
        id_siswa: req.body.id_siswa,
        isi_pengaduan: req.body.isi_pengaduan,
        lokasi_pengaduan: req.body.lokasi_pengaduan,
        foto: req.body.foto,
        status: req.body.status
    }
    let message = ""

    let sql = "insert into pengaduan set ?"
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

// POST: /pengaduan/update --> end point untuk update data pengaduan 
app.post("/update", (req,res) => {
    let data = [{
        id_pengaduan: req.body.id_pengaduan,
        tgl_pengaduan: req.body.tgl_pengaduan,
        id_siswa: req.body.id_siswa,
        isi_pengaduan: req.body.isi_pengaduan,
        lokasi_pengaduan: req.body.lokasi_pengaduan,
        foto: req.body.foto,
        status: req.body.status
    }, req.body.id_pengaduan]
    let message = ""

    let sql = "update pengaduan set ? where id_pengaduan = ?"
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

// DELETE: /pengaduan/:id_pengaduan --> end point untuk hapus data pengaduan
app.delete("/:id_pengaduan", (req,res) => {
    let data = {
        id_jurusan : req.params.id_jurusan
    }
    let message = ""
    let sql = "delete from pengaduan where ?"
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