'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

describe('Router match', function () {
    var router = new _router2['default'](require('./data/routes'));
    it('should match correct route name', function () {
        expect(router.match('http://example.com/users/1/comments').name).toBe('users.comments');
        expect(router.match('http://example.com/users').name).toBe('users');
    });

    it('should match correct route name even with slashes', function () {
        expect(router.match('http://example.com/users/1/comments/').name).toBe('users.comments');
        expect(router.match('http://example.com/users/').name).toBe('users');
    });

    it('should match route params', function () {
        expect(router.match('http://example.com/users/1/comments').params).toEqual({ id: '1' });
        expect(router.match('http://example.com/users/1').params).toEqual({ id: '1' });
    });

    it('should prefer route params over query params', function () {
        expect(router.match('http://example.com/users/1?id=2').params).toEqual({ id: '1' });
    });

    it('should return original query param even if there is a route param with the same name', function () {
        expect(router.match('http://example.com/users/1?id=2').query).toEqual({ id: '2' });
    });

    it('should match domain', function () {
        expect(router.match('http://example.com/users/1?id=2').domain).toBe('example.com');
    });

    it('should match scheme', function () {
        expect(router.match('http://example.com/users/1?id=2').scheme).toBe('http');
    });
});
//# sourceMappingURL=match-url.js.map