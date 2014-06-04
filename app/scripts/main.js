// Mason's Code


// Need to use this at the top every file you use backbone. Going to use this to make new instances
// Backbone is how you call the library. Just like $ for jQuery or _ for underscore.
// .Model is a constructor 
// .extend allows you to use the Model constructor for your own instance. 
User = Backbone.Model.extend({

// Not sure here. Initialize the extend? I don't understand why there is nothing in the 
// this.on function. I also don't understand 'change'.
  initialize: function() {
    this.on('change', function(){
      // here is the future
    })
  },
 
 // This sets the property human to every object in the Model. 
  defaults: {
    human: true
  },
 
// Has something to do with how _ is read. Not sure.
  idAttribute: '_id'
});

// Naming the .Collection constructor UserCollection
// Using .extend to make a new instance. 
UserCollection = Backbone.Collection.extend({
 
 // targeting the model called user. I think.
  model: User,
 // this is where the model: User is located. 
  url: 'http://tiny-pizza-server.herokuapp.com/collections/test-users',
})
// I don't understand how the above is working other than connecting to that url.
 
 
// setting up a view constructor named UserView. 
UserView = Backbone.View.extend({

 // creating an underscore template & using jQuery to connect with that script class
 // in the html.
  template: _.template($('.user-list-item').text()),
  editTemplate: _.template($('.user-list-edit-item').text()),
 
 // these affect the templates above. Confused on click. It's not in the events list 
 // for backbone. 
 // when .edit-button is clicked : the showEdit function is engaged. 
  events: {
    'click .edit-button'    : 'showEdit',
    'click .save-button'    : 'saveChanges',
    'click .delete-button'  : 'destroy',
    'keydown input'         : 'checkForChanges'
 
  },
 
 // I think this is listening to the model for changes. If there are, it runs the 
 // render function. Not sure about initialize.
  initialize: function(){
 
    this.listenTo(this.model, 'change', this.render);
 
 // the above is then prepended to the container div using jQuery. This.el creates an empty div
 // Not sure why. Actually, this.render is being put in the empty div which is then prepended
 // to the container. 
    $('.container').prepend(this.el);
    this.render();
  },
 

  render: function(){
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  showEdit: function(){
    var renderedTemplate = this.editTemplate(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  saveChanges: function(){
    var nameVal = this.$el.find('.name input').val();
    this.model.set('name', nameVal);
    this.model.save()
  },
 
  destroy: function(){
    this.model.destroy();
    this.remove();
  },
 
  checkForChanges: function(){
    if (this.model.get('name') !== this.$el.find('.name input').val()){
      this.$el.find('.name input').addClass('changed')
    } else {
      this.$el.find('.name input').removeClass('changed')
    }
  }
 
 
})
 
 
// create instances
 
var coolUsers = new UserCollection();
 
coolUsers.fetch().done(function(){
  coolUsers.each(function(user){
    new UserView({model: user});
  })
});





// These create an empty div
// this.el

// $(this.el)
// this.$el
// the above two examples are the same thing.






































