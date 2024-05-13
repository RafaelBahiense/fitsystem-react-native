export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export namespace Gender {
  export function parse(value: string) {
    if (value in Gender) {
      return value as Gender;
    }
    throw new Error(`Invalid gender value: ${value}`);
  }
}
