import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('art', function() {
    this.route('detail', { path: '/detail/:slug'});
  });
  this.route('film', function() {
    this.route('detail', { path: '/detail/:slug'});
  });
  this.route('photography');
  this.route('design');
  this.route('offline');
});

export default Router;
