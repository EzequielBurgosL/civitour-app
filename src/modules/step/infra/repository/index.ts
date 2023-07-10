import { StepModel } from '../models/sequelize/step';
import { SequelizeStepRepository } from './SequelizeStepRepository';

const stepRepository = new SequelizeStepRepository(StepModel);

export { stepRepository };
