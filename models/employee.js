// models/Employee.js
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    employeeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING // Assuming this stores the path to the employee's photo
    },
    notes: {
      type: DataTypes.TEXT
    }
  });

  return Employee;
};
