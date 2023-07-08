import { DataTypes, Sequelize } from 'sequelize';

type rawClient = {
  entityId: string;
  name: string;
  phone: string;
  participantNumber: number;
};

/* eslint-disable new-cap */
export const ClientModel = (sequelize: Sequelize) => {
  const Client = sequelize.define(
    'client',
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
      phone: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      participantNumber: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'client',
    },
  );

  return Client;
};
