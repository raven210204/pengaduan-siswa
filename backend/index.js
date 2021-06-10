//inisialisasi library
const express = require("express")
const app = express()

//import fungsi authorization auth
const auth = require("./auth")

//import route admin
const admin = require("./router/admin")
app.use("/admin", admin)

//import route pengaduan
const pengaduan = require("./router/pengaduan")
app.use("/pengaduan", pengaduan)

//import route siswa
const siswa = require("./router/siswa")
app.use("/siswa", siswa)

//import route tanggapan
const tanggapan = require("./router/tanggapan")
app.use("/tanggapan", tanggapan)

//membuat web server dengan port 2910
app.listen(2910, () => {
    console.log("server run on port 2910")
})