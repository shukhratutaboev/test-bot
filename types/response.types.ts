type ErrorType = Partial<{
  message: string;
  code: string;
}>;
type ResponseDataType<T = {}> = Partial<{
  items: T[] | null;
  item: T | null;
  totalCount: number;
  error: ErrorType | null;
  errors: ErrorType[] | null;
}>;

export default ResponseDataType;
