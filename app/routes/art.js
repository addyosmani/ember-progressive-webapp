import Ember from 'ember';
import fetch from 'ember-network/fetch';
import ENV from 'ember-progressive-webapp/config/environment';

export default Ember.Route.extend({
  model() {
    return fetch(ENV.baseURL + '/data/art.json')
      .then(function(response) {
        return response.json();
      });
  },
  serialize(model) {
    return {
      post_slug: '/art/detail/' + model.get('slug')
    };
  }
});
