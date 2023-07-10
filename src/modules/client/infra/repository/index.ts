import { ClientModel } from '../models/sequelize/client';
import { SequelizeClientRepository } from './SequelizeClientRepository';

const clientRepository = new SequelizeClientRepository(ClientModel);

export { clientRepository };
