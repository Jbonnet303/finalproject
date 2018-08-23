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
        name: 'Steel Bar Shaker',
        description: 'Featuring a durable stainless steel construction, this bar shaker helps keep your cold cocktails chilled until served!',
        img: 'https://cdnimg.webstaurantstore.com/images/products/extra_large/31015/413339.jpg',
        quantity: 100
      }, {
        name: 'Cocktail Bar Strainer',
        description: 'Serving as the perfect bar accessory, this four-pronged stainless steel strainer allows you to drain cocktails and other assorted beverages through a glass or shaker of ice.',
        img: 'https://cdnimg.webstaurantstore.com/images/products/extra_large/49370/828059.jpg',
        quantity: 150
      }, {
        name: 'Cocktail Kit',
        description: 'It includes 13 separate pieces, and each piece serves a unique function to help make the drink mixing process faster and easier.',
        img: 'https://cdnimg.webstaurantstore.com/images/products/large/446658/1646130.jpg',
        quantity: 200
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
