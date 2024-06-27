const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('dpsi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Customer = require('./Customer')(sequelize, DataTypes);
const Employee = require('./employee')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Supplier = require('./supplier')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Shipper = require('./shipper')(sequelize, DataTypes);
const OrderDetail = require('./orderDetail')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

// Define associations between models
Customer.hasMany(Order, { foreignKey: 'customerID' });
Order.belongsTo(Customer, { foreignKey: 'customerID' });

Employee.hasMany(Order, { foreignKey: 'employeeID' });
Order.belongsTo(Employee, { foreignKey: 'employeeID' });

Shipper.hasMany(Order, { foreignKey: 'shipperID' });
Order.belongsTo(Shipper, { foreignKey: 'shipperID' });

Supplier.hasMany(Product, { foreignKey: 'supplierID' });
Product.belongsTo(Supplier, { foreignKey: 'supplierID' });

Category.hasMany(Product, { foreignKey: 'categoryID' });
Product.belongsTo(Category, { foreignKey: 'categoryID' });

Order.hasMany(OrderDetail, { foreignKey: 'orderID' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderID' });

Product.hasMany(OrderDetail, { foreignKey: 'productID' });
OrderDetail.belongsTo(Product, { foreignKey: 'productID' });

module.exports = {
  sequelize,
  Customer,
  Employee,
  Product,
  Supplier,
  Order,
  Shipper,
  OrderDetail,
  Category,
  User
};
