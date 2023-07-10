import { Repository } from '../../../../core/infra/Repository';
import { Step } from '../../domain/Step';
import { StepMap } from '../mappers/StepMap';

type BaseQuery = {
  where: {
    [key: string]: string;
  };
  includes?: any;
};

export class SequelizeStepRepository implements Repository<Step> {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): BaseQuery {
    return {
      where: {},
    };
  }

  public async findById(step: Step): Promise<Step> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = step.id.toValue().toString();

    const result = await this.models.Step.findOne(baseQuery);

    if (!result) {
      return null as unknown as Step;
    }

    return result;
  }

  public async exists(step: Step): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = step.id.toValue().toString();
    const result = await this.models.Step.findOne(baseQuery);

    return Boolean(result) === true;
  }

  public async save(step: Step): Promise<void> {
    const StepModel = this.models.Step;
    const exists = await this.exists(step);
    const map = new StepMap();
    const rawUser = map.toPersistence(step);

    try {
      if (exists) {
        const sequelizeUserInstance = await StepModel.findOne({
          where: { id: step.id.toValue() },
        });

        await sequelizeUserInstance.update(rawUser);
      } else {
        await StepModel.create(rawUser);
      }
    } catch (err) {
      throw new Error();
    }
  }
}
