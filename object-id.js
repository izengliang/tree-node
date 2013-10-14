/**
 * Implementation of ObjectId generator
 * http://docs.mongodb.org/manual/core/object-id/
 */

var increment = 0x1000000;
var localId1  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1);
var localId2  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1);

function objectId() {
  var dateNow = ((new Date()).getTime()/100 | 0).toString(16);
  return dateNow + localId1 + localId2 + (++increment).toString(16).substring(1);
}

// Expose `objectId`
module.exports = objectId;