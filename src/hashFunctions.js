var hashingFunction1 = function(range, value){
  var hash = 0;
  for (var i = 0; i < value.length; i++) {
    hash = (hash<<5) + hash + value.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % range;
};

var hashingFunction2 = function(range, value){
  var result = value.split('');

  result =  (result.map(function(value) {
    return value.charCodeAt(0);
  }).map(function(value) {
    return (value ^ range);
  }).reduce(function(a, b) {
    return a + b ;
  })) ^ 255;
  return result % range;
};

var hashingFunction3 = function(range, value){
  return (value.length ^ 255) % range;
};

var hashingFunctions = [hashingFunction1, hashingFunction2, hashingFunction3];
