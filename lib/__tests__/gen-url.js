'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

describe('Url generation', function () {
    var router = new _router2['default'](require('./data/routes'));

    it('should generate url with params', function () {
        expect(router.url({ name: 'users.comments', params: { id: 1 } })).toBe('/users/1/comments');
        expect(router.url({ name: 'users', params: { id: 1 } })).toBe('/users/1');
    });

    it('should generate url w/o params', function () {
        expect(router.url({ name: 'users' })).toBe('/users');
    });

    it('should throw an exception if route requires params but no correct params provided', function () {
        expect(function () {
            return router.url({ name: 'users.comments', params: { idd: 1 } });
        }).toThrow(new Error('Parameter \'id\' should be provided'));

        //expect(() => router.url({name: 'users.commentss', params: {idd: 1}}))
        //    .toThrow(new Error("Route with name '" + name.join(".") + "' does not exists"));
    });
});
//# sourceMappingURL=gen-url.js.map