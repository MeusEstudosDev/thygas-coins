export interface IProducts {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  categoryId: string;
}

export interface IProductReq {
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: string;
  categoryId: string;
  [key: string]: any;
}
