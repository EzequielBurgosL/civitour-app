import { ClientModel } from '../models/sequelize/client';
import { SequelizeClientRepo } from './SequelizeClientRepo';

const clientRepo = new SequelizeClientRepo(ClientModel);

export { clientRepo };
