import { DataTypes, Sequelize } from 'sequelize';

/* eslint-disable new-cap */
export const TourModel = (sequelize: Sequelize) => {
  const Tour = sequelize.define(
    'tour',
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
      city: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      maxParticipants: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      steps: {
        type: DataTypes.JSON,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'tour',
    },
  );

  return Tour;
};
