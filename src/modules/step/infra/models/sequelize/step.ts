import { DataTypes, Sequelize } from 'sequelize';

/* eslint-disable new-cap */
export const StepModel = (sequelize: Sequelize) => {
  const Step = sequelize.define(
    'step',
    {
      entityId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      location: {
        type: DataTypes.JSON,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'step',
    },
  );

  return Step;
};
