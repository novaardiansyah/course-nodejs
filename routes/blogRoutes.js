// ==========================================================================================
const express        = require('express');
const blogController = require('../controllers/blogController');
const router         = express.Router();

router.get('/', blogController.blog_index);
router.get('/create-blog', blogController.blog_create_get);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_detail);
router.delete('/:id', blogController.blog_delete);

module.exports = router;