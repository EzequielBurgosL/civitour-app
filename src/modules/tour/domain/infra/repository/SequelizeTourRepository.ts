
import { Repository } from '../../../../../core/infra/Repository';
import { Tour } from '../../Tour';
import { TourMap } from '../mappers/TourMap';

type BaseQuery = {
  where: {
    [key: string]: string;
  };
  includes?: any;
};

export class SequelizeTourRepository implements Repository<Tour> {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): BaseQuery {
    return {
      where: {},
    };
  }

  public async findById(tour: Tour): Promise<Tour> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = tour.id.toValue().toString();

    const result = await this.models.Tour.findOne(baseQuery);

    if (!result) {
      return null as unknown as Tour;
    }

    return result;
  }

  public async exists(tour: Tour): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = tour.id.toValue().toString();
    const result = await this.models.Tour.findOne(baseQuery);

    return Boolean(result) === true;
  }

  public async save(tour: Tour): Promise<void> {
    const TourModel = this.models.Tour;
    const exists = await this.exists(tour);
    const map = new TourMap();
    const rawUser = map.toPersistence(tour);

    try {
      if (exists) {
        const sequelizeUserInstance = await TourModel.findOne({
          where: { id: tour.id.toValue() },
        });

        await sequelizeUserInstance.update(rawUser);
      } else {
        await TourModel.create(rawUser);
      }
    } catch (err) {
      throw new Error();
    }
  }
}
