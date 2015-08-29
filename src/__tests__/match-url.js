import Router from "../router";

describe('Router match', () => {
    const router = new Router(require('./data/routes'));
    it('should match correct route name', () => {
        expect(router.match('http://example.com/users/1/comments').name).toBe('users.comments');
        expect(router.match('http://example.com/users').name).toBe('users');
    });

    it('should match correct route name even with slashes', () => {
        expect(router.match('http://example.com/users/1/comments/').name).toBe('users.comments');
        expect(router.match('http://example.com/users/').name).toBe('users');
    });

    it('should match route params', () => {
        expect(router.match('http://example.com/users/1/comments').params).toEqual({id: '1'});
        expect(router.match('http://example.com/users/1').params).toEqual({id: '1'});
    });

    it('should prefer route params over query params', () => {
        expect(router.match('http://example.com/users/1?id=2').params).toEqual({id: '1'});
    });

    it('should return original query param even if there is a route param with the same name', () => {
        expect(router.match('http://example.com/users/1?id=2').query).toEqual({id: '2'});
    });

    it('should match domain', () => {
        expect(router.match('http://example.com/users/1?id=2').domain).toBe("example.com");
    });

    it('should match scheme', () => {
        expect(router.match('http://example.com/users/1?id=2').scheme).toBe("http");
    });
});