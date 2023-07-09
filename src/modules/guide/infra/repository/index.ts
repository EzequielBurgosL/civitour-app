import { GuideModel } from '../models/sequelize/guide';
import { SequelizeGuideRepo } from './SequelizeGuideRepo';

const clientRepo = new SequelizeGuideRepo(GuideModel);

export { clientRepo };
