const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 //Note: Find all tags
  // be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name]'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name']
      }
    ]
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

 //Note: Find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'Unable to find a tag using this id'})
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Note: Create a new tag
router.post('/', (req, res) => {
  Tag.Create({
    tag_name: req.body.tag_name,
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

 //Note: Update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'Unable to find a tag using this id'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  //Note: Delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy ({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'Unable to find a tag using this id'});
      return;
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
