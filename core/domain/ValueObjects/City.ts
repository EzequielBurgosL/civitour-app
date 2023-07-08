import { ValueObject } from '.';

interface CityProps {
  value: string;
}

export class City extends ValueObject<CityProps> {
  static readonly availableCities = ['Barcelona', 'London'];

  private constructor(props: CityProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(city: string): City {
    if (
      city === undefined ||
      city === null ||
      City.availableCities.includes(city)
    ) {
      throw new Error('City must be one of the available cities');
    } else {
      return new City({ value: city });
    }
  }
}
