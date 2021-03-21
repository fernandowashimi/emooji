declare namespace NodeJS {
  interface Global {
    prisma: any;
  }
}

declare namespace Application {
  interface Map<T> {
    [key: string]: T;
  }

  interface Day {
    id: number;
    date: string;
    emoji: number;
  }

  interface CreateOrUpdateDayInput {
    date: Date;
    emoji: number;
  }

  interface GetDaysFromMonthInput {
    gte: string;
    lte: string;
  }

  type ThemeMode = 'light' | 'dark';
}
