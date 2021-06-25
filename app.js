// ==========================================================================================

const express    = require('express');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const app        = express();
const port       = 3000;

// register view engine ejs
app.set('view engine','ejs');

// request connetion mongodb
const dbURI = 'mongodb+srv://<username>:<password>@<clusters>.cwss0.mongodb.net/<collection>?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((result) => {
    // run the server
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

// static file
app.use('/public', express.static(__dirname + '/public'));
// request data handler
app.use(express.urlencoded({extended: true}));
// use log morgan
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about page'
  });
});

app.use((req, res) => {
  res.render('404', {
    title: '404 page not found'
  });
});