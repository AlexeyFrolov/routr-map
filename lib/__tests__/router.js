'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

describe('Router match', function () {
    var router = new _router2['default'](require('./data/routes'));
    it('should match and build', function () {
        expect(router.url(router.match('/users/1/comments'))).toBe('/users/1/comments');
        expect(router.url(router.match('/users/1'))).toBe('/users/1');
        expect(router.url(router.match('/users'))).toBe('/users');
        expect(router.url(router.match('/users/'))).toBe('/users');
        expect(router.url(router.match('/users/1/'))).toBe('/users/1');
        expect(router.url(router.match('/users/1/comments/'))).toBe('/users/1/comments');
    });

    it('should match and build with domain', function () {
        expect(router.url(router.match('http://example.com/users/1/comments'))).toBe('http://example.com/users/1/comments');
        expect(router.url(router.match('http://example.com/users/1'))).toBe('http://example.com/users/1');
        expect(router.url(router.match('http://example.com/users'))).toBe('http://example.com/users');
    });

    //it('should match and build with domain w/o scheme', () => {
    //    expect(router.url(router.match('example.com/users/1/comments')))
    //        .toBe('http://example.com/users/1/comments');
    //    expect(router.url(router.match('example.com/users/1')))
    //        .toBe('http://example.com/users/1');
    //    expect(router.url(router.match('example.com/users')))
    //        .toBe('http://example.com/users');
    //});
});
//# sourceMappingURL=router.js.map