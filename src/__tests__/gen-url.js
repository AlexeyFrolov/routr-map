import Router from "../router";

describe('Url generation', () => {
    const router = new Router(require('./data/routes'));

    it('should generate url with params', () => {
        expect(router.url({name: 'users.comments', params: {id: 1}})).toBe('/users/1/comments');
    });
});