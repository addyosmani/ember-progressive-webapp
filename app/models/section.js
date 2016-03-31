import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  slug: DS.attr(),
  primaryColor: DS.attr(),
  secondaryColor: DS.attr(),
  image: DS.attr()
});
