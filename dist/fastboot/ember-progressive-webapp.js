"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ember-progressive-webapp/app', ['exports', 'ember', 'ember-progressive-webapp/resolver', 'ember-load-initializers', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberProgressiveWebappResolver, _emberLoadInitializers, _emberProgressiveWebappConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emberProgressiveWebappConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberProgressiveWebappConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberProgressiveWebappResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emberProgressiveWebappConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ember-progressive-webapp/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-progressive-webapp/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _emberProgressiveWebappConfigEnvironment) {

  var name = _emberProgressiveWebappConfigEnvironment['default'].APP.name;
  var version = _emberProgressiveWebappConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('ember-progressive-webapp/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ember-progressive-webapp/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ember-progressive-webapp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ember-progressive-webapp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ember-progressive-webapp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-progressive-webapp/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emberProgressiveWebappConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_emberProgressiveWebappConfigEnvironment['default'].APP.name, _emberProgressiveWebappConfigEnvironment['default'].APP.version)
  };
});
define('ember-progressive-webapp/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-progressive-webapp/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-progressive-webapp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ember-progressive-webapp/initializers/export-application-global', ['exports', 'ember', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberProgressiveWebappConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emberProgressiveWebappConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _emberProgressiveWebappConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emberProgressiveWebappConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-progressive-webapp/initializers/fastboot/ajax', ['exports'], function (exports) {
  /* globals najax */

  var nodeAjax = function nodeAjax(options) {
    najax(options);
  };

  exports['default'] = {
    name: 'ajax-service',

    initialize: function initialize(application) {
      application.register('ajax:node', nodeAjax, { instantiate: false });
      application.inject('adapter', '_ajaxRequest', 'ajax:node');
    }
  };
});
define("ember-progressive-webapp/initializers/fastboot/dom-helper-patches", ["exports"], function (exports) {
  /*globals Ember, URL*/
  exports["default"] = {
    name: "dom-helper-patches",

    initialize: function initialize(App) {
      // TODO: remove me
      Ember.HTMLBars.DOMHelper.prototype.protocolForURL = function (url) {
        var protocol = URL.parse(url).protocol;
        return protocol == null ? ':' : protocol;
      };

      // TODO: remove me https://github.com/tildeio/htmlbars/pull/425
      Ember.HTMLBars.DOMHelper.prototype.parseHTML = function (html) {
        return this.document.createRawHTMLSection(html);
      };
    }
  };
});
define('ember-progressive-webapp/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-progressive-webapp/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ember-progressive-webapp/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ember-progressive-webapp/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ember-progressive-webapp/models/detail', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr(),
    slug: _emberData['default'].attr(),
    author: _emberData['default'].attr(),
    date: _emberData['default'].attr(),
    primaryColor: _emberData['default'].attr(),
    secondaryColor: _emberData['default'].attr(),
    image: _emberData['default'].attr(),
    desc: _emberData['default'].attr(),
    content: _emberData['default'].attr()
  });
});
define('ember-progressive-webapp/models/section', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr(),
    slug: _emberData['default'].attr(),
    primaryColor: _emberData['default'].attr(),
    secondaryColor: _emberData['default'].attr(),
    image: _emberData['default'].attr()
  });
});
define('ember-progressive-webapp/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ember-progressive-webapp/router', ['exports', 'ember', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberProgressiveWebappConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberProgressiveWebappConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('art', function () {
      this.route('detail', { path: '/detail/:slug' });
    });
    this.route('film', function () {
      this.route('detail', { path: '/detail/:slug' });
    });
    this.route('photography');
    this.route('design');
    this.route('offline');
  });

  exports['default'] = Router;
});
define('ember-progressive-webapp/routes/art/detail', ['exports', 'ember', 'ember-network/fetch', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberNetworkFetch, _emberProgressiveWebappConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return (0, _emberNetworkFetch['default'])(_emberProgressiveWebappConfigEnvironment['default'].baseURL + 'data/' + params.slug + '.json').then(function (response) {
        return response.json();
      });
    },
    renderTemplate: function renderTemplate() {
      this.render('art/detail', {
        into: 'application'
      });
    }
  });
});
define('ember-progressive-webapp/routes/art', ['exports', 'ember', 'ember-network/fetch', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberNetworkFetch, _emberProgressiveWebappConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return (0, _emberNetworkFetch['default'])(_emberProgressiveWebappConfigEnvironment['default'].baseURL + 'data/art.json').then(function (response) {
        return response.json();
      });
    },
    serialize: function serialize(model) {
      return {
        post_slug: '/art/detail/' + model.get('slug')
      };
    }
  });
});
define('ember-progressive-webapp/routes/design', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-progressive-webapp/routes/film/detail', ['exports', 'ember', 'ember-network/fetch', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberNetworkFetch, _emberProgressiveWebappConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return (0, _emberNetworkFetch['default'])(_emberProgressiveWebappConfigEnvironment['default'].baseURL + 'data/' + params.slug + '.json').then(function (response) {
        return response.json();
      });
    },
    renderTemplate: function renderTemplate() {
      this.render('film/detail', {
        into: 'application'
      });
    }
  });
});
define('ember-progressive-webapp/routes/film', ['exports', 'ember', 'ember-network/fetch', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberNetworkFetch, _emberProgressiveWebappConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return (0, _emberNetworkFetch['default'])(_emberProgressiveWebappConfigEnvironment['default'].baseURL + 'data/film.json').then(function (response) {
        return response.json();
      });
    },
    serialize: function serialize(model) {
      return {
        post_slug: '/film/detail/' + model.get('slug')
      };
    }
  });
});
define('ember-progressive-webapp/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('art');
    }
  });
});
define('ember-progressive-webapp/routes/offline', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-progressive-webapp/routes/photography', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-progressive-webapp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('ember-progressive-webapp/services/fastboot', ['exports', 'ember'], function (exports, _ember) {

  var alias = _ember['default'].computed.alias;
  var computed = _ember['default'].computed;

  exports['default'] = _ember['default'].Service.extend({
    cookies: alias('_fastbootInfo.cookies'),
    headers: alias('_fastbootInfo.headers'),
    host: computed(function () {
      return this._fastbootInfo.host();
    })
  });
});
define("ember-progressive-webapp/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.5",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 6
            },
            "end": {
              "line": 11,
              "column": 27
            }
          },
          "moduleName": "ember-progressive-webapp/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Art");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.5",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 6
            },
            "end": {
              "line": 12,
              "column": 29
            }
          },
          "moduleName": "ember-progressive-webapp/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Film");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.5",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 6
            },
            "end": {
              "line": 13,
              "column": 43
            }
          },
          "moduleName": "ember-progressive-webapp/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Photography");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.5",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 6
            },
            "end": {
              "line": 14,
              "column": 33
            }
          },
          "moduleName": "ember-progressive-webapp/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Design");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "ember-progressive-webapp/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Application shell ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("input");
        dom.setAttribute(el1, "type", "checkbox");
        dom.setAttribute(el1, "class", "check");
        dom.setAttribute(el1, "id", "check");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" CSS-only drawer menu ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "for", "check");
        dom.setAttribute(el1, "class", "btn");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el2 = dom.createElement("svg");
        dom.setAttribute(el2, "viewBox", "0 0 24 24");
        dom.setAttribute(el2, "preserveAspectRatio", "xMidYMid meet");
        dom.setAttribute(el2, "class", "style-scope iron-icon");
        dom.setAttribute(el2, "style", "pointer-events: none; display: block; width: 100%; height: 100%;");
        var el3 = dom.createElement("g");
        dom.setAttribute(el3, "class", "style-scope iron-icon");
        var el4 = dom.createElement("path");
        dom.setAttribute(el4, "d", "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z");
        dom.setAttribute(el4, "class", "style-scope iron-icon");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        dom.setNamespace(null);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "drawer menu");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2, "class", "content-container");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "for", "check");
        dom.setAttribute(el1, "class", "cbtn");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "contentBody");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "right-container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "toolbar");
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Zuperkülblog");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [12, 1]), 3, 3);
        return morphs;
      },
      statements: [["block", "link-to", ["art"], [], 0, null, ["loc", [null, [11, 6], [11, 39]]]], ["block", "link-to", ["film"], [], 1, null, ["loc", [null, [12, 6], [12, 41]]]], ["block", "link-to", ["photography"], [], 2, null, ["loc", [null, [13, 6], [13, 55]]]], ["block", "link-to", ["design"], [], 3, null, ["loc", [null, [14, 6], [14, 45]]]], ["content", "outlet", ["loc", [null, [22, 4], [22, 14]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("ember-progressive-webapp/templates/art/detail", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "ember-progressive-webapp/templates/art/detail.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "article-detail");
        var el2 = dom.createTextNode("\n   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "image");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("article");
        var el3 = dom.createTextNode("\n     ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "header");
        var el4 = dom.createTextNode("\n       ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("address");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n       ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "title");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n       ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("time");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n     ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n     ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3, "class", "main");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n     ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n   ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element3, [3]);
        var element5 = dom.childAt(element2, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createAttrMorph(element1, 'style');
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[2] = dom.createAttrMorph(element4, 'style');
        morphs[3] = dom.createMorphAt(element4, 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [5]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element5, [1]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element5, [3]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "style", ["concat", ["background-color: ", ["get", "model.primaryColor", ["loc", [null, [2, 49], [2, 67]]]], "; background-image: url('", ["get", "model.image", ["loc", [null, [2, 96], [2, 107]]]], "')"]]], ["content", "model.author", ["loc", [null, [5, 16], [5, 32]]]], ["attribute", "style", ["concat", ["color: ", ["get", "model.secondaryColor", ["loc", [null, [6, 42], [6, 62]]]]]]], ["content", "model.title", ["loc", [null, [6, 66], [6, 81]]]], ["content", "model.date", ["loc", [null, [7, 13], [7, 27]]]], ["content", "model.desc", ["loc", [null, [10, 12], [10, 26]]]], ["content", "model.content", ["loc", [null, [11, 11], [11, 28]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-progressive-webapp/templates/art", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.5",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "moduleName": "ember-progressive-webapp/templates/art.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "image");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "title");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(fragment, [3]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'style');
            morphs[1] = dom.createAttrMorph(element1, 'style');
            morphs[2] = dom.createMorphAt(element1, 0, 0);
            return morphs;
          },
          statements: [["attribute", "style", ["concat", ["background-color: ", ["get", "section.primaryColor", ["loc", [null, [6, 48], [6, 68]]]], "; background-image: url('", ["get", "section.image", ["loc", [null, [6, 97], [6, 110]]]], "');"]]], ["attribute", "style", ["concat", ["background-color: ", ["get", "section.secondaryColor", ["loc", [null, [7, 50], [7, 72]]]], ";"]]], ["content", "section.title", ["loc", [null, [7, 77], [7, 94]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.5",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "ember-progressive-webapp/templates/art.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["art.detail", ["get", "section.slug", ["loc", [null, [5, 26], [5, 38]]]]], ["class", "article-headline"], 0, null, ["loc", [null, [5, 2], [8, 14]]]]],
        locals: ["section"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 6
          }
        },
        "moduleName": "ember-progressive-webapp/templates/art.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "two-columns-grid");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]], ["block", "each", [["get", "model", ["loc", [null, [4, 8], [4, 13]]]]], [], 0, null, ["loc", [null, [4, 0], [9, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-progressive-webapp/templates/design", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 6
          }
        },
        "moduleName": "ember-progressive-webapp/templates/design.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "empty-page");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("We don't have any articles for this section yet.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("We're working on it!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ember-progressive-webapp/templates/film/detail", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "ember-progressive-webapp/templates/film/detail.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "article-detail");
        var el2 = dom.createTextNode("\n   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "image");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("article");
        var el3 = dom.createTextNode("\n     ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "header");
        var el4 = dom.createTextNode("\n       ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("address");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n       ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "title");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n       ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("time");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n     ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n     ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3, "class", "main");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n     ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n   ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element3, [3]);
        var element5 = dom.childAt(element2, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createAttrMorph(element1, 'style');
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[2] = dom.createAttrMorph(element4, 'style');
        morphs[3] = dom.createMorphAt(element4, 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [5]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element5, [1]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element5, [3]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "style", ["concat", ["background-color: ", ["get", "model.primaryColor", ["loc", [null, [2, 49], [2, 67]]]], "; background-image: url('", ["get", "model.image", ["loc", [null, [2, 96], [2, 107]]]], "')"]]], ["content", "model.author", ["loc", [null, [5, 16], [5, 32]]]], ["attribute", "style", ["concat", ["color: ", ["get", "model.secondaryColor", ["loc", [null, [6, 42], [6, 62]]]]]]], ["content", "model.title", ["loc", [null, [6, 66], [6, 81]]]], ["content", "model.date", ["loc", [null, [7, 13], [7, 27]]]], ["content", "model.desc", ["loc", [null, [10, 12], [10, 26]]]], ["content", "model.content", ["loc", [null, [11, 11], [11, 28]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-progressive-webapp/templates/film", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.5",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "moduleName": "ember-progressive-webapp/templates/film.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "image");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "title");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(fragment, [3]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'style');
            morphs[1] = dom.createAttrMorph(element1, 'style');
            morphs[2] = dom.createMorphAt(element1, 0, 0);
            return morphs;
          },
          statements: [["attribute", "style", ["concat", ["background-color: ", ["get", "section.primaryColor", ["loc", [null, [6, 48], [6, 68]]]], "; background-image: url('", ["get", "section.image", ["loc", [null, [6, 97], [6, 110]]]], "');"]]], ["attribute", "style", ["concat", ["background-color: ", ["get", "section.secondaryColor", ["loc", [null, [7, 50], [7, 72]]]], ";"]]], ["content", "section.title", ["loc", [null, [7, 77], [7, 94]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.5",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "ember-progressive-webapp/templates/film.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["film.detail", ["get", "section.slug", ["loc", [null, [5, 27], [5, 39]]]]], ["class", "article-headline"], 0, null, ["loc", [null, [5, 2], [8, 14]]]]],
        locals: ["section"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 6
          }
        },
        "moduleName": "ember-progressive-webapp/templates/film.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "two-columns-grid");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]], ["block", "each", [["get", "model", ["loc", [null, [4, 8], [4, 13]]]]], [], 0, null, ["loc", [null, [4, 0], [9, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-progressive-webapp/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 29
          }
        },
        "moduleName": "ember-progressive-webapp/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Welcome to Zuperkülblog.");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ember-progressive-webapp/templates/offline", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 6
          }
        },
        "moduleName": "ember-progressive-webapp/templates/offline.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "empty-page");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("You are currently offline. Connect to the network to view content.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ember-progressive-webapp/templates/photography", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 6
          }
        },
        "moduleName": "ember-progressive-webapp/templates/photography.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "empty-page");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("We don't have any articles for this section yet.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("We're working on it!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ember-progressive-webapp/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"ember-progressive-webapp","environment":"development","baseURL":"","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"ember-progressive-webapp","version":"v0.0.4","autoboot":false},"serviceWorker":{"enabled":true,"debug":true,"fallback":["/offline"]},"exportApplicationGlobal":true}};
});

/* jshint ignore:end */

/* jshint ignore:start */


define('~fastboot/app-factory', ['ember-progressive-webapp/app', 'ember-progressive-webapp/config/environment'], function(App, config) {
  App = App['default'];
  config = config['default'];

  return {
    'default': function() {
      return App.create(config.APP);
    }
  };
});


/* jshint ignore:end */
//# sourceMappingURL=ember-progressive-webapp.map