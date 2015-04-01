var generateString = function() {
  var s = '';
  for (var i = 0; i < 6; i++) {
    s = s + String.fromCharCode(Math.random() * 10000);
  }
  return s;
};

describe('bloomFilter', function() {
  var bloomFilter;

beforeEach(function() {
  bloomFilter = new BloomFilter(18, hashingFunctions);
});

  it('Should have methods "test" and "add"' , function() {
    expect(bloomFilter.test).to.be.a("function");
    expect(bloomFilter.add).to.be.a("function");
  });

  it('Should have property _storage that is an instance of BitArray', function() {
    expect(bloomFilter._storage instanceof BitArray).to.equal(true);
  });

  it('Should return true for any values in the filter', function() {
    bloomFilter.add('Hi');
    bloomFilter.add('You');
    bloomFilter.add('Crazy');
    bloomFilter.add('Diamond!');
    expect(bloomFilter.test('Hi')).to.equal(true);
    expect(bloomFilter.test('You')).to.equal(true);
    expect(bloomFilter.test('Crazy')).to.equal(true);
    expect(bloomFilter.test('Diamond!')).to.equal(true);
  });

  it('Should return false (most of the time) for values not in the filter', function() {
    bloomFilter.add("What's Up?");
    bloomFilter.add('Coding is rad!');
    bloomFilter.add('What, is this a center for ants?!?');
    bloomFilter.add("IT'S 1:30AM WHAT AM I DOING?!?!?!?");
    var positives = 0;
    for (var i = 0; i < 10001; i++) {
      if (bloomFilter.test(generateString())) {
        positives++;
      }
    }
    expect((positives / 100000) < 0.4).to.equal(true);
  });

  it('Should have a failure rate that is approximately the known failure rate', function() {
    bloomFilter.add('Hey there');
    bloomFilter.add('Do not be scared');
    bloomFilter.add('Everything is fine');
    var estFailureRate = Math.pow(1- (Math.exp(-0.5)), 3);
    var positives = 0;
    for (var i = 0; i < 10001; i++) {
      if (bloomFilter.test(generateString())) {
        positives++;
      }
    }
    var actualFailureRate = (positives / 10000);
    expect((Math.abs(actualFailureRate - estFailureRate)) < 0.2).to.equal(true);
  });
});
