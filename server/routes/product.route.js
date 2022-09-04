const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/thumbnails')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
  })
  
  const upload = multer({ storage: storage })


router.get('', productController.getProducts);
router.get('/search', productController.searchProduct);
router.post('', upload.single('thumbnail'), productController.addProduct);
router.patch('', productController.updateProduct);
router.delete('', productController.deleteProduct);


module.exports = router;