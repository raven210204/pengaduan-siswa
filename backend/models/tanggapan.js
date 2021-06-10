'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tanggapan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.admin, {
        foreignKey: "id_admin",
        as: 'admin'
      })
      this.hasMany(models.pengaduan, {
        foreignKey: "id_pengaduan",
        as: 'pengaduan'
      })
    }
  };
  tanggapan.init({
    id_tanggapan: DataTypes.INTEGER,
    id_pengaduan: DataTypes.INTEGER,
    tgl_tanggapan: DataTypes.DATE,
    isi_tanggapan: DataTypes.TEXT,
    id_admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tanggapan',
  });
  return tanggapan;
};