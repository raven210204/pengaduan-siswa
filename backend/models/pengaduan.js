'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengaduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.siswa, {
        foreignKey: "id_siswa",
        as: 'siswa'
      })
    }
  };
  pengaduan.init({
    id_pengaduan: DataTypes.INTEGER,
    tgl_pengaduan: DataTypes.DATE,
    id_siswa: DataTypes.INTEGER,
    isi_pengaduan: DataTypes.TEXT,
    lokasi_pengaduan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'pengaduan',
  });
  return pengaduan;
};