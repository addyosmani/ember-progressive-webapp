import Ember from 'ember';
import fetch from 'ember-network/fetch';
import ENV from 'ember-progressive-webapp/config/environment';

export default Ember.Route.extend({
  model(params) {
    return fetch(ENV.baseURL + '/data/' + params.slug + '.json')
      .then(function(response) {
        return response.json();
      });
  },
  renderTemplate: function() {
    this.render('film/detail', {
        into: 'application'
    });
  }
});
