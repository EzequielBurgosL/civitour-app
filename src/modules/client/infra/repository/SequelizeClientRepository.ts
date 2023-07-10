import { Repository } from '../../../../core/infra/Repository';
import { Client } from '../../domain/Client';
import { ClientMap } from '../mappers/clientMap';

type BaseQuery = {
  where: {
    [key: string]: string;
  };
  includes?: any;
};

// Type SqlConnection = {
//   Client: {
//     findOne: Function,
//     create: Function,
//     update: Function,
//   }
// }

export class SequelizeClientRepo implements Repository<Client> {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): BaseQuery {
    return {
      where: {},
    };
  }

  public async findById(client: Client): Promise<Client> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = client.id.toValue().toString();

    const result = await this.models.Client.findOne(baseQuery);

    if (!result) {
      return null as unknown as Client;
    }

    return result;
  }

  public async exists(client: Client): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.id = client.id.toValue().toString();
    const result = await this.models.Client.findOne(baseQuery);

    return Boolean(result) === true;
  }

  public async save(client: Client): Promise<void> {
    const ClientModel = this.models.Client;
    const exists = await this.exists(client);
    const map = new ClientMap();
    const rawUser = map.toPersistence(client);

    try {
      if (exists) {
        const sequelizeUserInstance = await ClientModel.findOne({
          where: { id: client.id.toValue() },
        });

        await sequelizeUserInstance.update(rawUser);
      } else {
        await ClientModel.create(rawUser);
      }
    } catch (err) {
      throw new Error();
    }
  }
}
