import {TableActions} from "../interfaces/table.interface";

export const TABLE_ACTIONS: TableActions = {
  add: false,
  search: false,
  edit: {
    can: false,
  },
  delete: {
    can: false,
  },
  view: {
    can: false,
  },
}


export const ORDER: { [key: string]: string } = {
  'asc': 'ASC',
  'desc': 'DESC',
  '': 'NONE',
};
