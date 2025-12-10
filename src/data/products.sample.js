import { v4 as uuid } from "uuid";

const now = new Date();

export const products = [
  {
    id: uuid(),
    name: "Sample Product 1",
    sku: "SP-001",
    price: 9.99,
    quantity: 100,
    category: "Default",
    createdAt: now,
  },
  {
    id: uuid(),
    name: "Sample Product 2",
    sku: "SP-002",
    price: 19.99,
    quantity: 50,
    category: "Default",
    createdAt: now,
  }
];
