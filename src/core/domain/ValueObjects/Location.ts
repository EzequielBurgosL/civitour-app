import { ValueObject } from '.';

type Coordinates = {
  latitude: string;
  longitude: string;
};

interface LocationProps {
  value: Coordinates;
}

export class Location extends ValueObject<LocationProps> {
  static readonly MAX_LENGTH = 60;

  private constructor(props: LocationProps) {
    super(props);
  }

  get value(): Coordinates {
    return this.props.value;
  }

  public static create(location: Coordinates): Location {
    if (location === undefined || location === null) {
      throw new Error('Must provide a valid location.');
    } else {
      return new Location({ value: location });
    }
  }
}
