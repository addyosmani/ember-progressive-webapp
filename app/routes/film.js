import Ember from 'ember';
import fetch from 'ember-network/fetch';
import ENV from 'ember-progressive-webapp/config/environment';

export default Ember.Route.extend({
  model() {
    return fetch(ENV.baseURL + '/data/film.json')
      .then(function(response) {
        return response.json();
      });
  },
  serialize(model) {
    return {
      post_slug: '/film/detail/' + model.get('slug')
    };
  }
});
