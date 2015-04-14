# LearnBloomFilters
A testing-driven approach to learning how to implement bloom filters in JavaScript.

### Why should I use this?
If you want to learn how to make a bloom filter, of course!  This repo uses a test running html document, SpecRunner.html, to
double check your work and (hopefully) guide you through the process of creating your own bloom filter in javascript.  This
learning style has been unabashedly stolen from [Hack Reactor](http://www.hackreactor.com/), where I am currently a student.  
Thanks for being awesome Hack Reactor!  
Bloom filters are amazing data structures that can potentially save a system from costly 'contains' lookups. 
For more information on them check out [my blog post](http://blog.adamv.io/Learning-bloom-filters-through-TDD) 
, where I give an explanation on their structure and outline some instances where a developer may find them useful. 
 If you find that this not enough information to fully implement a bloom filter, feel free to drop me a line and request some
 clarification and I'll do my best to update the post with the new details.
 
### How do I use this repo?
 First of all, fork this repo and clone it to your local machine (or just simply clone it directly if you don't want to use git
 to keep track of your progress).
 Open up SpecRunner.html in a browser and initially you're going to see a lot of red.  These are your failing tests that you 
 should make pass!
 ![Failing SpecRunner](http://i.imgur.com/ILar9jA.png)
 These tests require you to create a bloom filter object using the well used [pseudo-classical instantiation](http://javascript.info/tutorial/pseudo-classical-pattern)
 pattern.  If this doesn't appeal to you, feel free to fork my repo and make one with tests assuming a different pattern.
 All of the work you need to do is within the src/bloomFilter.js file.  The bit array, that you can create using the given
 [bitArray.js library](https://github.com/TheAdamizer/bitArray.js), should be the _storage property on your new object and you're
 going to need to store the other parameters passed into the constructor as well.  
 Some clues:
 
   * 'm' is the traditional designation given to a bloom filter to represent the desired length of the internal boolean array.
 
   *  The array hashingFunctions is available to you as an array of 3 hashing functions, though technically you won't need them
 to implement the bloomFilter, just assume that the user of the bloomFilter (the spec runner) will give your filter the 
 hashing functions they would like you to use.  You should use all of them in your implementation.  

The hashing functions should be used by passing in first the desired range (from 0 to n) of indexes you would like to get
back from the function, followed by the value you would like to hash.  An example:  

```javascript
hashingFunctions[0](100, 'some string to hash');
\\ returns a hash between the values of 0 and 99
```

Keep working to meet the specified tests.  If you need more clarification on what the tests are looking for, click on the 
specific requirement in SpecRunner.html and it will show you the mocha tests that need to pass.  
![Expanded requirement](http://i.imgur.com/fhd377j.png)

Keep coding away and you'll start to see some green.  Eventually you'll have a SpecRunner.html that looks like this:  
![Passing tests](http://i.imgur.com/SBgl9hR.png)  
and then you should have successfully implemented a bloom filter!
