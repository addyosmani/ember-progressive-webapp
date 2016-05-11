define('ember-progressive-webapp/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('ember-progressive-webapp/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember-progressive-webapp/tests/helpers/start-app', 'ember-progressive-webapp/tests/helpers/destroy-app'], function (exports, _qunit, _emberProgressiveWebappTestsHelpersStartApp, _emberProgressiveWebappTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _emberProgressiveWebappTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _emberProgressiveWebappTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('ember-progressive-webapp/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/helpers/resolver', ['exports', 'ember-progressive-webapp/resolver', 'ember-progressive-webapp/config/environment'], function (exports, _emberProgressiveWebappResolver, _emberProgressiveWebappConfigEnvironment) {

  var resolver = _emberProgressiveWebappResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _emberProgressiveWebappConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberProgressiveWebappConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('ember-progressive-webapp/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/helpers/start-app', ['exports', 'ember', 'ember-progressive-webapp/app', 'ember-progressive-webapp/config/environment'], function (exports, _ember, _emberProgressiveWebappApp, _emberProgressiveWebappConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _emberProgressiveWebappConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _emberProgressiveWebappApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('ember-progressive-webapp/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/models/detail.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/detail.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/detail.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/models/section.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/section.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/section.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/art/detail.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/art/detail.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/art/detail.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/art.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/art.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/art.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/design.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/design.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/design.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/film/detail.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/film/detail.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/film/detail.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/film.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/film.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/film.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/offline.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offline.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offline.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/routes/photography.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/photography.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/photography.js should pass jshint.');
  });
});
define('ember-progressive-webapp/tests/test-helper', ['exports', 'ember-progressive-webapp/tests/helpers/resolver', 'ember-qunit'], function (exports, _emberProgressiveWebappTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_emberProgressiveWebappTestsHelpersResolver['default']);
});
define('ember-progressive-webapp/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ember-progressive-webapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map