export interface Item {
    id: number | string;
    title: string;
    description: string;
    price: number;
  }

  export interface UpdateItem {
    edit: Boolean;
    item: Item
  }