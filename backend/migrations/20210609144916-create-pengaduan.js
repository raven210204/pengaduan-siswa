'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pengaduan', {
      id_pengaduan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_pengaduan: {
        type: Sequelize.DATE
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        reference: {
          model: "siswa",
          key: "id_siswa"
        }
      },
      isi_pengaduan: {
        type: Sequelize.TEXT
      },
      lokasi_pengaduan: {
        type: Sequelize.TEXT
      },
      foto: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Accepted','Rejected','Finished')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pengaduan');
  }
};