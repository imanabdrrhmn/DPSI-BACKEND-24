// models/Order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    shipperID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Order;
};
