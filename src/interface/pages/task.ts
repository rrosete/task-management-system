export interface IData {
  id?: number;
  task: string;
  createdAt?: string | number;
  status: string;
  actions?: JSX.Element;
}
