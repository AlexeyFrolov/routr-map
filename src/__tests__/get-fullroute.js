import Router from "../router";

describe('Router getFullRoute', () => {
    const router = new Router(require('./data/routes'));

    it('should return full route name', () => {
        expect(router.getFullRoute({name: 'users.comments', params: {id: '1'}})).toEqual(['users', ':id', 'comments']);
    });
});