## DESCRIPTION
Pure DSL implementation for routes declaration. Data-driven and hierarchical. Pull requests are welcome.
See https://github.com/AlexeyFrolov/routr-map/blob/master/src/__tests__/match-url.js for examples.
It could be used with React (you can store the "route" in the state tree) and with express to parse url. The only responsobility is to `match` and `url` (buildUrl from route match result).

The idea is to declare routes as a tree where for each node you can attach additional meta-info like so:

```javacript
{
    "users": {
        _defaults: { // reoutes are just data you can attach any meta, such as default values
          handler: (req, res) => {},
        }
        ":id": {
            "comments": {
              _defaults: {
                 handler: (req, res) => {},
                 security: (req,res) => {}
              }
            },
            "likes": {}}
    },
    "posts": {

    }
}
```

Inspired by https://gist.github.com/AlexeyFrolov/f14ab900df8e10fab831


## TODO
* support for defaults
* docs
