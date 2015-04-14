/*
  Author: Adam Van Antwerp
  Date Created: 3/31/2015
  Last Modification: 4/9/2015
  Description: This implements a simple BitArray class for doing bitwise
    storing and manipulation.
*/

var BitArray = function(length) {
  //The length of the desired bit array.
  this.length = length;

  //This is the internal unsigned 8 bit integer array that will serve as the
  //bit array.
  this._uint8 = new Uint8Array(Math.ceil(this.length / 8));
};

BitArray.prototype.calculateIndex = function(idx) {
  //To determine the desired position to operate on the unsigned 8 bit int
  //array, divide the given index by 8 and floor the result.
  return Math.floor(idx / 8);
};

BitArray.prototype.generateMask = function(idx) {
  //The mask is used to turn on or check the desired bit in a position's
  //8 bit integer. We determine the mask integer by finding the remainder
  //of the desired index divided by 8 and calculating 2 to that number.
  return Math.pow(2, (idx % 8));
};

BitArray.prototype.trueBits = function(integer) {
  //This method takes an unsigned integer and efficiently calculates the number
  //of true bits that integer is represented by in binary.

  //Start the running total at 0
  var total = 0;

  //The number of 1 bits is equal to the number of times you can take an integer
  //and bitwise AND it with that number minus 1. We will iterate until the
  //number is equal to 0.
  while (integer !== 0) {
    integer = integer & (integer - 1);
    total++;
  }

  return total;
};


BitArray.prototype.flipOn = function(idx) {
  //Use calculateIndex to determine the desired bitwise index.
  var index = this.calculateIndex(idx);

  //Use generateMask to get the desired mask for bitwise manipulation.
  var mask = this.generateMask(idx);

  //Now, the magic happens.  To 'turn on' the desired bit, we do a bitwise
  //OR against the current 8 bit integer in the calculated index.
  this._uint8[index] = this._uint8[index] | mask;
};

BitArray.prototype.flipOff = function(idx) {
  //Use calculateIndex to determine the desired bitwise index.
  var index = this.calculateIndex(idx);

  //Use generate mask, then subtract it from 255  to make a mask to flip
  //off the bit.
  var mask = 255 - this.generateMask(idx);

  //Now and the current integer with the generated mask to flipp off the bit.
  this._uint8[index] = this._uint8[index] & mask;
};

BitArray.prototype.toggle = function(idx) {
  //Use calculateIndex to determine the desired bitwise index.
  var index = this.calculateIndex(idx);

  //Use generateMask to get the desired mask for bitwise manipulation.
  var mask = this.generateMask(idx);

  //To toggle the desired bit, we do a bitwise XOR against the integer with
  //the mask.
  this._uint8[index] = this._uint8[index] ^ mask;
};

BitArray.prototype.check = function(idx) {
  //We need to know the 'bitwise' index we would like to check, so we call
  //calculateIndex.
  var index = this.calculateIndex(idx);

  //Just like before, we need to generate the desired mask in order to check
  //if a peticular bit is on.
  var mask = this.generateMask(idx);

  //To check if a certain bit is 'on', we simply bitwise AND the mask against
  //the desired 8 bit integer.  If it returns something other than 0, than we
  //know that that integer is on.
  return ((this._uint8[index] & mask) !== 0);
};

BitArray.prototype.percentTrue = function() {
  //This function is used to determine how much of the array is occupied by
  //true (aka 1) bits.

  //Instantiate an integer to keep track of the running total of true bits.
  var total = 0;

  //For each element in the array, call trueBits on the unsigned 8 bit integer
  //and add that to the running total of true values.
  for (var i = 0; i < this._uint8.length; i++) {
    total = total + this.trueBits(this._uint8[i]);
  }

  return total / this.length;
};
