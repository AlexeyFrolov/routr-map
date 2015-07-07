'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var assign = Object.assign || function (target) {
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }

    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
            continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
            }
        }
    }
    return to;
};

var Router = (function () {
    function Router(routes) {
        _classCallCheck(this, Router);

        this.routes = routes;
    }

    _createClass(Router, [{
        key: 'match',
        value: function match(url) {
            var _Router$parseUrl = Router.parseUrl(url);

            var path = _Router$parseUrl.path;
            var query = _Router$parseUrl.query;
            var domain = _Router$parseUrl.domain;
            var scheme = _Router$parseUrl.scheme;

            var params = path.reduce(function (result, step) {
                if (result === false) {
                    return false;
                }
                var node = result.node;

                var routeStep = Router.getRouteStep(node, step);
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
            params.params = assign({}, query, params.params);
            params.query = query;
            params.name = params.routePath.filter(function (step) {
                return !Router.isParam(step);
            }).join('.');
            params.domain = domain;
            params.scheme = scheme;
            return params;
        }
    }, {
        key: 'url',

        /**
         * {name, params}
         */
        value: function url(_ref) {
            var name = _ref.name;
            var _ref$params = _ref.params;
            var params = _ref$params === undefined ? {} : _ref$params;
            var _ref$query = _ref.query;
            var query = _ref$query === undefined ? {} : _ref$query;
            var _ref$domain = _ref.domain;
            var domain = _ref$domain === undefined ? '' : _ref$domain;
            var _ref$scheme = _ref.scheme;
            var scheme = _ref$scheme === undefined ? 'http' : _ref$scheme;

            scheme = domain && scheme + '://';
            return scheme + domain + '/' + this.getFullRoute({ name: name, params: params }).reduce(function (url, step) {
                url.push(Router.isParam(step) && params[Router.paramName(step)] || step);
                return url;
            }, []).join('/');
        }
    }, {
        key: 'getFullRoute',
        value: function getFullRoute(_ref2) {
            var name = _ref2.name;
            var _ref2$params = _ref2.params;
            var params = _ref2$params === undefined ? {} : _ref2$params;

            name = typeof name === 'string' && name.split('.') || name;
            var result = [];
            var current = name.shift();
            var node = this.routes;
            while (current) {
                if (node[current]) {
                    result.push(current);
                    node = node[current];
                    var nodeParam = Router.getNodeParam(node);
                    var paramName = Router.paramName(nodeParam);
                    current = name.shift() || params[paramName] && nodeParam;
                } else {
                    var nodeParam = Router.getNodeParam(node);
                    if (!nodeParam) {
                        throw new Error('Route with name \'' + name.join('.') + '\' does not exists');
                    }
                    var paramName = Router.paramName(nodeParam);
                    if (!params[paramName]) {
                        throw new Error('Parameter \'' + paramName + '\' should be provided');
                    }
                    name.unshift(current);
                    current = nodeParam;
                }
            }
            return result;
        }
    }], [{
        key: 'getRouteStep',
        value: function getRouteStep(node, step) {
            return node && node[step] && step || Router.getNodeParam(node);
        }
    }, {
        key: 'parseUrl',
        value: function parseUrl(url) {
            var scheme = '';
            url = url.split('://');
            if (url[1]) {
                scheme = url[0];
                url = url[1];
            } else {
                url = url[0];
            }

            var _url$split = url.split('?');

            var _url$split2 = _slicedToArray(_url$split, 2);

            var path = _url$split2[0];
            var query = _url$split2[1];

            path = path.split('/');
            var domain = scheme.length && path[0] || '';
            path = domain.length && path.splice(1) || path;
            path = path.filter(function (step) {
                return step.trim() !== '';
            });
            query = _querystring2['default'].parse(query);
            return { path: path, query: query, scheme: scheme, domain: domain };
        }
    }, {
        key: 'isParam',
        value: function isParam(step) {
            return step.substr(0, 1) === ':';
        }
    }, {
        key: 'paramName',
        value: function paramName(step) {
            return step.substr(1);
        }
    }, {
        key: 'getNodeParam',
        value: function getNodeParam(node) {
            return Object.keys(node).filter(function (key) {
                return Router.isParam(key);
            })[0] || '';
        }
    }]);

    return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];
//# sourceMappingURL=router.js.map