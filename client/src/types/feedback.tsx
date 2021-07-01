export type Feedback =
  | {
      icon: string;
      message?: string;
      dataKey?: string;
      range?: [number | null, number | null];
    }[]
  | {
      icon: string;
      message: string;
  };
