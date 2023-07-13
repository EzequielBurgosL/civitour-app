import { TourModel } from '../models/sequelize/tour';
import { SequelizeTourRepository } from './SequelizeTourRepository';

const tourRepository = new SequelizeTourRepository(TourModel);

export { tourRepository };
