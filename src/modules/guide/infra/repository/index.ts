import { GuideModel } from '../models/sequelize/guide';
import { SequelizeGuideRepository } from './SequelizeGuideRepository';

const guideRepository = new SequelizeGuideRepository(GuideModel);

export { guideRepository };
