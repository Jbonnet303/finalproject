// console.log(express);
// const express = require('express');
// const app = express();
// const port = (3000);
//
// app.get('/', (request, response) => {
//   response.send('hello world!!!!');
//   });
//
// app.get('/home', (request, response) => {
//   response.send('');
// });
//
//
//   app.listen(port, () => {
//     console.log('I am listening on port 3000');
//   });

// console.log('Hello');
const express = require('express');
const app = express();
const Billiard = require('./models/billiards.js');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;


const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/billiards';


// Middleware Body-Parser
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));




app.get('/', (request, response) => {
  response.send('this works');
});


// Index Route Home Page
app.get('/billiards', (request, response) => {
// Billiard.find({}, (error, allBillards) => {
response.render('index.ejs', {
  // billiard: allBillards
    });
  });
// });



// 8 Ball Route Page
app.get('/billiards/eight', (request, response) => {
  Billiard.find({}, (error, allBillards) => {
  response.render('eight.ejs', {
  billiards: allBillards
    });
  });
});


// // Route Specialtiy Drink Page
// app.get('/bars/drink', (request, response) => {
//   Bar.find({}, (error, allBars) => {
//   response.render('drink.ejs', {
//   bars: allBars
//     });
//   });
// });
//
//
// // Route Locations Page
// app.get('/bars/location', (request, response) => {
//   Bar.find({}, (error, allBars) => {
//   response.render('location.ejs', {
//   bars: allBars
//     });
//   });
// });
//
//
// // Create Route
// app.get('/bars/shop/new', (request, response) => {
// response.render('new.ejs');
// });
//
// //Post New Product Route
// app.post('/bars/shop', (request, response) => {
//   Bar.create(request.body, (error, createdBar) => {
//     response.redirect('/bars/shop');
//   })
// });
//
//
//
//
// //Edit Route
// app.get('/bars/:id/edit', (request, response) => {
//   Bar.findById(request.params.id, (error, foundBar) => {
//     response.render('edit.ejs', {
//         bar: foundBar
//     });
//   });
// });
//
// //New edited Information Route
// app.put('/bars/shop/:id', (request, response) => {
//   Bar.findByIdAndUpdate(request.params.id, request.body, {new:true}, (error, updateModel) => {
//     response.redirect('/bars/shop');
//   });
// });
//
//
//
// // Show Route
// app.get('/bars/shop/:id', (request, response) => {
//   Bar.findById(request.params.id, (error, foundBar) => {
//   response.render('show.ejs', {
//     bar: foundBar
//   });
//   })
// });
//
//
// // Buy
// app.put('/bars/shop/:id/buy', (request, response) => {
// Bar.findByIdAndUpdate(request.params.id, {$inc:{quantity: -1}}, (error) => {
//   if (error) {
//     response.send(error.message)
//   } else {
//     response.redirect('back')
//   }
// });
// });
//
//
// // Delete Route
// app.delete('/bars/:id', (request, response) => {
//   Bar.findByIdAndRemove(request.params.id, (error, deletedBar) => {
//     response.redirect('/bars/shop');
//   })
// });


app.listen(PORT, () => {
  console.log('listening...');
});


mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open', () => {
  console.log('connected to mongoose!!!!!!!');
})
