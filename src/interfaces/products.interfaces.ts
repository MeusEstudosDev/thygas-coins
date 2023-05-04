export interface IProducts {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
}

export interface IProductReq {
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: string;
}
