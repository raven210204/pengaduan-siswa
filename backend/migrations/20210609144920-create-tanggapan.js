'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tanggapan', {
      id_tanggapan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pengaduan: {
        type: Sequelize.INTEGER,
        reference: {
          model: "pengaduan",
          key: "id_pengaduan"
        }
      },
      tgl_tanggapan: {
        type: Sequelize.DATE
      },
      isi_tanggapan: {
        type: Sequelize.TEXT
      },
      id_admin: {
        type: Sequelize.INTEGER,
        reference: {
          model: "admin",
          key: "id_admin"
        }
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
    await queryInterface.dropTable('tanggapan');
  }
};