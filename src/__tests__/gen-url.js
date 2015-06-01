import Router from "../router";

describe('Url generation', () => {
    const router = new Router(require('./data/routes'));

    it('should generate url with params', () => {
        expect(router.url({name: 'users.comments', params: {id: 1}})).toBe('/users/1/comments');
        expect(router.url({name: 'users', params: {id: 1}})).toBe('/users/1');
    });

    it('should generate url w/o params', () => {
        expect(router.url({name: 'users'})).toBe('/users');
    });

    it('should throw an exception if route requires params but no correct params provided', () => {
        expect(() => router.url({name: 'users.comments', params: {idd: 1}}))
            .toThrow(new Error("Parameter 'id' should be provided"));

        //expect(() => router.url({name: 'users.commentss', params: {idd: 1}}))
        //    .toThrow(new Error("Route with name '" + name.join(".") + "' does not exists"));
    });
});