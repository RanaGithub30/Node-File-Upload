const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const multer = require('multer');
const upload = multer();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure express-handlebars
app.engine('hbs', exphbs.create({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/',
    partialsDir: __dirname + '/views/'
}).engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(upload.any());

// Define routes
const userRoutes = require('./routes/front/userRoutes');
const userApiRoutes = require('./routes/api/userApiRoutes');

app.use('/', userRoutes);
app.use('/api/', userApiRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});