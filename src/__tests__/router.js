import Router from "../router";

describe('Router', () => {
    const router = new Router(require('./data/routes'));
    it('should match url', () => {
        expect(router.match('http://example.com/users/1/comments').name).toBe('users.comments');
    });
});