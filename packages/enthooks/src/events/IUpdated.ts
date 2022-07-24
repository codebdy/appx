export type UpdateData<T> = { [entityName: string]: { data: T[] } };

export interface IUpdated{
  requested: UpdateData<any>;
  response: { [entity: string]: any };
}