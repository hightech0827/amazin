type ItemType = {
  name: string;
  qty: number;
  price: number;
  countInStock: number;
  image?: string;
  seller?: UserType;
  product: ProductType;
};

type CartType = ItemType[];
