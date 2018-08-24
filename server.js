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

app.get('/billiards/prize/seed', (request, response) => {
  Billiard.create (
    [
      {
        name: 'Racking Tool',
        description: 'Use to rack when playing 8 ball!',
        img: 'https://images-na.ssl-images-amazon.com/images/I/41l-k3lrDqL._SX425_.jpg',
        quantity: 1
      }, {
        name: 'Cue Stick',
        description: 'Use for breaking and running the table!',
        img: 'http://pluspng.com/img-png/cue-png-heritage-cue-black-w-light-wood-420.png',
        quantity: 1
      }, {
        name: 'Cue Ball',
        description: 'Use the dots and watch the spin on the cue ball!',
        img: 'https://cdn7.bigcommerce.com/s-c1tzcg0txe/products/3636/images/1669/ozonepark_2460_1395343107__84352.1490639034.500.750.jpg?c=2',
        quantity: 1
      },
  ],
    (error, data) => {
      response.redirect('/billiards/prize');
      }
    )
  });

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

// Route English on Cue Ball
app.get('/billiards/english', (request, response) => {
  Billiard.find({}, (error, allBilliards) => {
  response.render('english.ejs', {
  billiards: allBilliards
    });
  });
});

// Route Specialtiy Drink Page
app.get('/billiards/run', (request, response) => {
  Billiard.find({}, (error, allBilliards) => {
  response.render('run.ejs', {
  billiards: allBilliards
    });
  });
});

// Route 5 Tips/Almost done
app.get('/billiards/foot', (request, response) => {
  Billiard.find({}, (error, allBilliards) => {
  response.render('foot.ejs', {
  billiards: allBilliards
    });
  });
});

// Route Prize Page
app.get('/billiards/prize', (request, response) => {
  Billiard.find({}, (error, allBilliards) => {
  response.render('prize.ejs', {
  billiards: allBilliards
    });
  });
});

// Route Slow Mo Page
app.get('/billiards/slow', (request, response) => {
  Billiard.find({}, (error, allBilliards) => {
  response.render('slow.ejs', {
  billiards: allBilliards
    });
  });
});

// Show Route
app.get('/billiards/prize/:id', (request, response) => {
  Billiard.findById(request.params.id, (error, foundBilliard) => {
  response.render('show.ejs', {
    billiard: foundBilliard
  });
  })
});

//Edit Route
app.get('/billiards/:id/edit', (request, response) => {
  Billiard.findById(request.params.id, (error, foundBilliard) => {
    response.render('edit.ejs', {
        billiard: foundBilliard
    });
  });
});

//New edited Information Route
app.put('/billiards/prize/:id', (request, response) => {
  Billiard.findByIdAndUpdate(request.params.id, request.body, {new:true}, (error, updateModel) => {
    response.redirect('/billiards/prize');
  });
});

// Create Route
app.get('/billiards/new', (request, response) => {
response.render('new.ejs');
});

//Post New Product Route
app.post('/billiards/prize', (request, response) => {
  Billiard.create(request.body, (error, createdBilliard) => {
    response.redirect('/billiards/prize');
  })
});

// Buy
app.put('/billiards/prize/:id/buy', (request, response) => {
Billiard.findByIdAndUpdate(request.params.id, {$inc:{quantity: -1}}, (error) => {
  if (error) {
    response.send(error.message)
  } else {
    response.redirect('back')
  }
});
});

// Delete Route
app.delete('/billiards/:id', (request, response) => {
  Billiard.findByIdAndRemove(request.params.id, (error, deletedBilliard) => {
    response.redirect('/billiards/prize');
  })
});

// // Route Normal page Page
// app.get('/bars/drink', (request, response) => {
//   Bar.find({}, (error, allBars) => {
//   response.render('drink.ejs', {
//   bars: allBars
//     });
//   });
// });



app.listen(PORT, () => {
  console.log('listening...');
});


mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open', () => {
  console.log('connected to mongoose!!!!!!!');
})
