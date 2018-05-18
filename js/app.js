// Model
var model = {
  currentCat: 0,
  isFormShowing: false,
  cats: [{
      name: 'Catter',
      imgSrc: 'images/catter.jpg',
      clickCount: 0
    },
    {
      name: 'Meowingtons',
      imgSrc: 'images/meowingtons.jpg',
      clickCount: 0
    },
    {
      name: 'Thinker',
      imgSrc: 'images/thinker.jpg',
      clickCount: 0
    },
    {
      name: 'Derpson',
      imgSrc: 'images/derpson.jpg',
      clickCount: 0
    },
    {
      name: 'Watchy',
      imgSrc: 'images/watchy.jpg',
      clickCount: 0
    }
  ]
};

// Octopus
var octopus = {
  init: function() {
    // Set first displayed cat
    model.currentCat = model.cats[0];

    // Initialize both views
    catView.init();
    catListView.init();
    formView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // set the currently-selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // increments the counter for the currently-selected cat
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  },

  showAdminPanel: function() {
    formView.adminForm.classList.remove('hidden');
    model.isFormShowing = true;
  }
};

// View
var catView = {
  init: function() {
    // store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cats');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('clicks');

    // on click, increment the current cat's counter
    this.catImageElem.addEventListener('click', _ => {
      octopus.incrementCounter();
    });

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
    this.countElem.textContent = currentCat.clickCount;
  }
};

var catListView = {

  init: function() {
    this.catListElem = document.getElementById('cats');

    this.render();
  },

  render: function() {

    // get the cats we'll be rendering from the octopus
    var cats = octopus.getCats();

    // Empty the cat list
    this.catListElem.innerHTML = '';

    // loop over the cats
    for (var i = 0; i < cats.length; i++) {
      // this is the cat we're currently looping over
      let cat = cats[i];

      // make a new cat list item and set its text
      let elem = document.createElement('li');
      elem.textContent = cat.name;

      // on click, setCurrentCat and render the catView
      // (this uses our closure-in-a-loop trick to connect the value
      //  of the cat variable to the click event function)
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));

      // finally, add the element to the list
      this.catListElem.appendChild(elem);
    }
  }
};

var formView = {
  init: function() {
    // store pointers to our DOM elements for easy access later
    this.adminBtn = document.getElementById('admin-btn');
    this.adminForm = document.getElementById('form');
    this.cancelBtn = document.getElementById('cancel-btn');

    this.adminBtn.addEventListener('click', _ => {
      octopus.showAdminPanel();
    });
  }
};

// make it go!
octopus.init();
