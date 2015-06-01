import qs from "querystring";

require("babel/polyfill");

class Router {

    routes;

    constructor (routes) {
        this.routes = routes;
    }

    match (url) {
        let {path, query, domain, scheme} = Router.parseUrl(url);
        let params = path.reduce((result, step) => {
            if (result === false) {
                return false;
            }
            let { node } = result;
            let routeStep = Router.getRouteStep(node, step);
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
        params.domain = domain;
        params.scheme = scheme;
        return params;
    }

    /**
     * {name, params}
     */
    url ({name, params = {}, query = {}, domain = "", scheme = ""}) {
        scheme = scheme && scheme + "://" || "";
        return scheme + domain + '/' + this.getFullRoute({name, params}).reduce((url, step) => {
            url.push(Router.isParam(step) && params[Router.paramName(step)] || step);
            return url;
        }, []).join('/');
    }

    getFullRoute({name, params = {}}) {
        name = typeof name === "string" && name.split(".") || name;
        result = [];
        let current = name.shift();
        let node = this.routes;
        while (current) {
            if (node[current]) {
                result.push(current);
                node = node[current];
                let nodeParam = Router.getNodeParam(node);
                let paramName = Router.paramName(nodeParam);
                current = name.shift() || params[paramName] && nodeParam;
            } else {
                let nodeParam = Router.getNodeParam(node);
                if (!nodeParam) {
                    throw new Error("Route with name '" + name.join(".") + "' does not exists");
                }
                let paramName = Router.paramName(nodeParam);
                if (!params[paramName]) {
                    throw new Error("Parameter '" + paramName + "' should be provided");
                }
                name.unshift(current);
                current = nodeParam;
            }
        }
        return result;
    }

    static getRouteStep(node, step) {
        return node && node[step] && step || Router.getNodeParam(node)
    }

    static parseUrl(url) {
        let scheme = "";
        url = url.split("://");
        if (url[1]) {
            scheme = url[0];
            url = url[1];
        } else {
            url = url[0];
        }
        let [path, query] = url.split("?");
        path = path.split("/");
        let domain = scheme.length && path[0] || "";
        path = domain.length && path.splice(1) || path;
        path = path.filter(step => step.trim() !== "");
        query = qs.parse(query);
        return {path, query, scheme, domain};
    }

    static isParam(step) {
        return step.startsWith(':');
    }

    static paramName(step) {
        return step.substr(1)
    }

    static getNodeParam(node) {
        return Object.keys(node).find(key => Router.isParam(key)) || "";
    }

}

export default Router;