export interface IGuardResult {
  isSuccess: boolean;
  error?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static againstNullOrUndefined(
    argument: any,
    argumentName: string,
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        isSuccess: false,
        error: `${argumentName} is null or undefined`,
      };
    }

    return { isSuccess: true };
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection,
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (!result.isSuccess) {
        return result;
      }
    }

    return { isSuccess: true };
  }

  public static isOneOf(
    value: any,
    validValues: any[],
    argumentName: string,
  ): IGuardResult {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { isSuccess: true };
    }

    return {
      isSuccess: false,
      error: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
        validValues,
      )}. Got "${value}".`,
    };
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        isSuccess: false,
        error: `${argumentName} is not within range ${min} to ${max}.`,
      };
    }

    return { isSuccess: true };
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    let failingResult: IGuardResult | null = null;

    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.isSuccess) {
        failingResult = numIsInRangeResult;
      }
    }

    if (failingResult) {
      return {
        isSuccess: false,
        error: `${argumentName} is not within the range.`,
      };
    }

    return { isSuccess: true };
  }
}
