import { DataTypes, Sequelize } from 'sequelize';

/* eslint-disable new-cap */
export const GuideModel = (sequelize: Sequelize) => {
  const Guide = sequelize.define(
    'guide',
    {
      entityId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'guide',
    },
  );

  return Guide;
};
