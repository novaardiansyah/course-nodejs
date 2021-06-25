// ==========================================================================================
const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({createdAt: -1})
    .then((result) => {
      res.render('blogs/index', {
        title: 'home page',
        blogs: result
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

const blog_detail = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/detail-blog', {
        title: 'detail blog',
        blog: result
      });
    })
    .catch((err) => {
      res.render('404', {
        title: '404 page not found'
      });
    });
}

const blog_create_get = (req, res) => {
  res.render('blogs/create-blog', {
    title: 'create a new blog'
  });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({redirect: '/'});
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  blog_index, blog_detail, blog_create_get,
  blog_create_post, blog_delete
}