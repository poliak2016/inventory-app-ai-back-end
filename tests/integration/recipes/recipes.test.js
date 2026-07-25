import { api } from "../../setup/testClient.js"
import { createProduct } from "../../helpers/product.helper.js"
import { createAdmin, createStaff } from "../../helpers/auth.helper.js"
import { authorization } from "../../helpers/auth.helper.js"

describe("recipes API (integration) ", () => {
  it("POST api/recipes/ - create recipe --> 201", async () => {
    const token = await createAdmin()

    const product = await createProduct(token)
    const productId = product.body.data.id

    const recipe = {
      name: "test name",
      ingredients: [
        { 
        productId,
        quantity: 100
      }
      ]
    }

    const res = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipe)

      expect(res.statusCode).toBe(201)
      expect(res.body.data.id).toBeDefined()
  })

  it("GET/api/recipes/id - get recipe by id --> 200", async() => {
    const token = await createAdmin()
    const product = await createProduct(token)
    const productId = product.body.data.id

    const recipeData = {
      name: "test name",
      ingredients: [{ 
        productId,
        quantity: 100
      }]
    }

    const createRecipe = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeData)

    const recipeId = createRecipe.body.data.id

    const res = await api.get(`/api/recipes/${recipeId}`).set(authorization(token))

    expect(res.statusCode).toBe(200)
    expect(res.body.data.id).toBeDefined()
    expect(res.body.data.name).toBe(recipeData.name)
  })

  it("PUT/recipe/id - update recipe data --> 200", async() =>{
    const token = await createAdmin()
    const product = await createProduct(token)
    const productId = product.body.data.id

    const recipeData = {
      name: "test name",
      ingredients: [{ 
        productId,
        quantity: 100
      }]
    }

    const createRecipe = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeData)

    const recipeId = createRecipe.body.data.id

    const updateRecipe = {
      name: "update test name",
      ingredients: [{ 
        productId,
        quantity: 101
      }]
    }

    const res = await api.put(`/api/recipes/${recipeId}`).set(authorization(token)).send(updateRecipe)

    expect(res.statusCode).toBe(200)
    expect(res.body.data.id).toBeDefined()
    expect(res.body.data.name).toBe(updateRecipe.name)
  })

  it("DELETE/api/recipe/id - delete recipe -- 204", async() => {
    const token = await createAdmin()
    const product = await createProduct(token)
    const productId = product.body.data.id

    const recipeData = {
      name: "test name",
      ingredients: [{ 
        productId,
        quantity: 100
      }]
    }

    const createRecipe = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeData)

    const recipeId = createRecipe.body.data.id

    const res = await api.delete(`/api/recipes/${recipeId}`).set(authorization(token))

    expect(res.statusCode).toBe(204)
    expect(res.body).toEqual({})
  })

  it("GET/api/recipes - get recipe without token --> 401", async() =>{
    const res = api.get("/api/recipes")

    expect((await res).statusCode).toBe(401)
  })

  it("GET/api/recipes/id - get recipe with other organization token --> 404", async() => {
    const tokenA = await createAdmin()
    const tokenB = await createAdmin()
    const product = await createProduct(tokenA)
    const productId = product.body.data.id

    const recipeData = {
      name: "test name",
      ingredients: [{ 
        productId,
        quantity: 100
      }]
    }

    const createRecipe = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${tokenA}`)
      .send(recipeData)

    const recipeId = createRecipe.body.data.id

    const res = await api.get(`/api/recipes/${recipeId}`).set(authorization(tokenB))

    expect(res.statusCode).toBe(404)
  })
  
  it("POST/api/recipes - staff try to create recipe --> 403", async() =>{
    const tokenStaff = await createStaff()

    const res = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${tokenStaff}`)
      .send({ name: "test", ingredients: [] })

      expect(res.statusCode).toBe(403)
  })

  it("POST/api/recipe - missed name --> 400", async() =>{
    const token = await createAdmin()
    const product = await createProduct(token)
    const productId = product.body.data.id

    const recipeData = {
      ingredients: [{ 
        productId,
        quantity: 100
      }]
    }

    const res = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeData)

    expect(res.statusCode).toBe(400)
  })

  it("POST/api/recipe - missed ingredients --> 400", async() =>{
    const token = await createAdmin()

    const recipeData = {
      name: "test name"
      }

    const res = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeData)

    expect(res.statusCode).toBe(400)
  })

  it("POST/api/recipe - used the same product twice --> 400", async() =>{
    const token = await createAdmin()
    const product = await createProduct(token)
    const productId = product.body.data.id

    const recipeData = {
      name: "test name",
      ingredients: [
        { 
        productId,
        quantity: 100
      },
        {
        productId,
        quantity: 200
      }
    ]
    }

    const res = await api
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeData)

    expect(res.statusCode).toBe(400)
  })
})

 