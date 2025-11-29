export const getProducts = (req, res) => {
  res.status(200).json({status: "List of products"});
}

export const createProduct = (req, res) => {
  res.status(201).json({status: "Product created"});
}

