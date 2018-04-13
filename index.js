var leven = require('leven');

function fuzzyCompare(objectA, objectB, opts) {

  if (!opts) {
    opts = {}
  }

  if (typeof objectA !== typeof objectB) {
    return makeResult(0);
  }

  if (typeof objectA === 'string') {
    return makeResult(fuzzyCompareStrings(objectA, objectB));
  }

  if (typeof objectA === 'number') {
    return makeResult(fuzzyCompareNumbers(objectA, objectB));
  }

  if (typeof objectA === 'object') {
    return makeResult(fuzzyCompareObjects(objectA, objectB));
  }

  return makeResult(0);





  function fuzzyCompareStrings(a, b) {
    if (b.length > a.length) {
      var tmp = a;
      a = b;
      b = tmp;
    }
    var distance = Math.abs(a.length - leven(a, b));
    return Math.min(Math.max(distance / a.length, 0), 1);
  }

  function fuzzyCompareNumbers(a, b) {
    return 1 - Math.min(Math.abs(a - b), 1);
  }

  function fuzzyCompareObjects(a, b) {
    var flatA = {};
    var flatB = {};
    flattenObject(a, flatA, '');
    flattenObject(b, flatB, '');

    if (!opts.ignoreExtraKeys && Object.keys(flatB).length > Object.keys(flatA).length) {
      var tmp = flatA;
      flatA = flatB;
      flatB = tmp;
    }

    var keysA = Object.keys(flatA);

    var overallEquality = 0;

    if (keysA.length === 0) {
      return 1;
    }

    for (var i = 0; i < keysA.length; ++i) {
      var key = keysA[i];
      var result = fuzzyCompare(flatA[key], flatB[key], opts);

      if (result.equal > 0) {
        overallEquality += result.equal;
      }
    }

    overallEquality = overallEquality / keysA.length;
    return overallEquality;
  }



  function makeResult(equality) {
    return {
      equal: equality
    };
  }
}


module.exports = fuzzyCompare;




function flattenObject(obj, flat, stack) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      var key = stack + '.' + property
      if (typeof obj[property] == "object") {
        flattenObject(obj[property], flat, key);
      } else {
        flat[key] = obj[property];
      }
    }
  }
}
