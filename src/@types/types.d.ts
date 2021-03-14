declare namespace NodeJS {
  interface Global {
    prisma: any;
  }
}

declare namespace Application {
  interface Map<T> {
    [key: string]: T;
  }

  interface CreateOrUpdateDayInput {
    date: Date;
    emoji: number;
  }
}
