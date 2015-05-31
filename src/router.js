import qs from "querystring";

require("babel/polyfill");

class Router {

    routes;

    constructor (routes) {
        this.routes = routes;
    }

    match (url) {
        let {path, query} = Router.parseUrl(url);
        var params = path.reduce((result, step) => {
            if (result === false) {
                return false;
            }
            let { node } = result;
            let routeStep = node && node[step] && step ||
                Object.keys(node).find(key => Router.isParam(key));
            if (!routeStep) {
                return false;
            }
            result.node = node[routeStep];
            result.routePath.push(routeStep);
            if (Router.isParam(routeStep)) {
                result.params[Router.paramName(routeStep)] = step;
            }
            return result;
        }, {
            node: this.routes,
            params: {},
            routePath: []
        });
        if (params === false) {
            return false;
        }
        params.params = Object.assign({}, query, params.params);
        params.query = query;
        params.name = params.routePath.filter(step => !Router.isParam(step)).join('.');
        return params;
    }

    /**
     * {name, params}
     */
    url (params) {
        //return params.name()
    }

    static parseUrl(url) {
        url = url.split("://");
        url = url[1] || url[0];
        let [path, query] = url.split("?");
        path = path.split("/").splice(1).filter(step => step.trim() !== "");
        query = qs.parse(query);
        return {path, query};
    }

    static isParam(step) {
        return step.startsWith(':');
    }

    static paramName(step) {
        return step.substr(1)
    }

}

export default Router;