// models/OrderDetail.js
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    orderDetailID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Ensure autoIncrement is correctly placed here
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return OrderDetail;
};
