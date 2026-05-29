import { api } from "../../setup/testClient.js";
import { newStockMovement } from "../../fixtures/stock-movement.fixture.js";
import { createAdmin } from "../../helpers/auth.helper.js";
import { newProduct } from "../../fixtures/product.fixture.js";

describe("Stock movements flow test", () => {
  it("POST/api/stock/movement -- admin make movement -> 201", async() =>{
    const admin = await createAdmin(); 

    const product = await api
      .post("/api/products")
      .set("Authorization", `Bearer ${ admin }`)
      .send(newProduct);

    const productId = product.body.data.id

    const res = await api
      .post("/api/stock/movements")
      .set("Authorization", `Bearer ${admin}`)
      .send({...newStockMovement, productId})

      expect(res.statusCode).toBe(201)

    const newProductData = await api
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${admin}`);


    expect(newProductData.body.data.quantity).toEqual(newProduct.quantity + newStockMovement.quantity)
  });
});