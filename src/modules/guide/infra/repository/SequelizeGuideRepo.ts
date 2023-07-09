import { Repository } from '../../../../core/infra/Repository';
import { Guide } from '../../domain/Guide';
import { GuideMap } from '../mappers/GuideMap';

type BaseQuery = {
  where: {
    [key: string]: string;
  };
  includes?: any;
};

export class SequelizeGuideRepo implements Repository<Guide> {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): BaseQuery {
    return {
      where: {},
    };
  }

  public async findById(guide: Guide): Promise<Guide> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = guide.id.toValue().toString();

    const result = await this.models.Guide.findOne(baseQuery);

    if (!result) {
      return null as unknown as Guide;
    }

    return result;
  }

  public async exists(guide: Guide): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = guide.id.toValue().toString();
    const result = await this.models.guide.findOne(baseQuery);

    return Boolean(result) === true;
  }

  public async save(guide: Guide): Promise<void> {
    const GuideModel = this.models.Guide;
    const exists = await this.exists(guide);
    const map = new GuideMap();
    const rawUser = map.toPersistence(guide);

    try {
      if (exists) {
        const sequelizeUserInstance = await GuideModel.findOne({
          where: { id: guide.id.toValue() },
        });

        await sequelizeUserInstance.update(rawUser);
      } else {
        await GuideModel.create(rawUser);
      }
    } catch (err) {
      throw new Error();
    }
  }
}
