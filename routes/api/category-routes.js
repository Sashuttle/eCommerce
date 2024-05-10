const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 //Note: Find all categories selecting only id and category_name.  Including related products.
 // find all categories
  // be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price']//FixMe: Need stock & category id?
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Note: Find one category by its id value
// find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['category_name', 'id'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price']
    }]
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({ message: 'Unable to find a category with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Note: Creating a new category
 // create a new category
router.post('/', (req, res) => {
  Category.create(
    {
      category_name: req.body.category_name,
    })
    .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

  //Note: updating a category
  // update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Unable to find a category with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Note: deleting a category by id value
  // delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Unable to find a category with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
