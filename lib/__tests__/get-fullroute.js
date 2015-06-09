'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

describe('Router getFullRoute', function () {
    var router = new _router2['default'](require('./data/routes'));

    it('should return full route name', function () {
        expect(router.getFullRoute({ name: 'users.comments', params: { id: '1' } })).toEqual(['users', ':id', 'comments']);
    });
});
//# sourceMappingURL=get-fullroute.js.map