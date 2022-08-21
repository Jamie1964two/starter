const { geoSearch } = require( '../models/product' );
const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ 
    name: 'vase table' });
  res.status(200).json({ products, nbHIts: products.length });
};

const getAllProducts = async (req, res) => {
  //console.log(req.query)
  const {featured, company, name} = req.query;
  console.log(req.query)
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = {$regex: name, $options: 'i'}
  }

  console.log(queryObject)

  const products = await Product.find(queryObject);

  res.status(200).json({ products, nbHIts: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
