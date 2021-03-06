var ev = require('equihashverify');
var util = require('./util.js');

var diff1 = global.diff1 = 0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

var algos = module.exports = global.algos = {
    sha256: {
        //Uncomment diff if you want to use hardcoded truncated diff
        //diff: '00000000ffff0000000000000000000000000000000000000000000000000000',
        hash: function(){
            return function(){
                return util.sha256d.apply(this, arguments);
            }
        }
    },
    'equihash': {
        multiplier: 1,
        diff: parseInt('0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
        hash: function(coinOptions){
            return function(){
                var params = coinOptions.params;
                //console.log("algoProperties.js: n= "  + params.n + ", k=" + params.k + ", pers=" + params.pers);
                return ev.verify.apply(this, [arguments[0], arguments[1], params.n, params.k, params.pers]);
            }
        }
    }
};

for (var algo in algos){
    if (!algos[algo].multiplier)
        algos[algo].multiplier = 1;
}
