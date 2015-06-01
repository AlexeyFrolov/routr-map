import Router from "../router";

describe('Router match', () => {
    const router = new Router(require('./data/routes'));
    it('should match and build', () => {
        expect(router.url(router.match('/users/1/comments'))).toBe('/users/1/comments');
        expect(router.url(router.match('/users/1'))).toBe('/users/1');
        expect(router.url(router.match('/users'))).toBe('/users');
        expect(router.url(router.match('/users/'))).toBe('/users');
        expect(router.url(router.match('/users/1/'))).toBe('/users/1');
        expect(router.url(router.match('/users/1/comments/'))).toBe('/users/1/comments');
    });

    it('should match and build with domain', () => {
        expect(router.url(router.match('http://example.com/users/1/comments')))
            .toBe('http://example.com/users/1/comments');
        expect(router.url(router.match('http://example.com/users/1')))
            .toBe('http://example.com/users/1');
        expect(router.url(router.match('http://example.com/users')))
            .toBe('http://example.com/users');
    });
});