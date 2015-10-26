'use strict';

// We will demonstrate a model of calculating the phi coeficient for getting
// statistics of the occurance of an event based on a series of circumstances

var journal = require('./journal.js');

var addEntry = function addEntry(events, didITurn) {
  journal.push({
    events: events,
    squirrel: didITurn
  });
};

addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

//{{{
//Correlation is a measure of dependence between variables (“variables” in the
//statistical sense, not the JavaScript sense). It is usually expressed as a
//coefficient that ranges from -1 to 1. Zero correlation means the variables
//are not related, whereas a correlation of one indicates that the two are
//perfectly related—if you know one, you also know the other. Negative one also
//means that the variables are perfectly related but that they are
//opposites—when one is true, the other is false.
//
//For binary (Boolean) variables,
//the phi coefficient (ϕ) provides a good measure of correlation and is
//relatively easy to compute. To compute ϕ, we need a table n that contains the
//number of times the various combinations of the two variables were observed.
//
//More details about what this actually does can be found here:
//http://eloquentjavascript.net/04_data.html
//}}}

// This is the function that computes the phi coefficient from an array
var phi = function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
};
console.log(phi([76, 9, 4, 1])); // 0.068599434

// The above function is simply a direct translation of the ϕ formula into JavaScript.
// Math.sqrt is the square root function, as provided by the Math object in a
// standard JavaScript environment. We have to sum two fields from the table to
// get fields like n1• because the sums of rows or columns are not stored
// directly in our data structure.

// To extract a two-by-two table for a specific event from this journal, we
// must loop over all the entries and tally up how many times the event occurs
// in relation to squirrel transformations.

var hasEvent = function hasEvent(event, entry) {
  return entry.events.indexOf(event) != -1;
};
var tableFor = function tableFor(event, journal) {
  var table = [0, 0, 0, 0];
  for (var i=0; i < journal.length; i++) {
    var entry = journal[i],
      index = 0;
    if (hasEvent(event, entry)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
};

console.log(tableFor('pizza', journal));

// We are going to use an object as a map to store phi coefficient for each
// event type

var map = {};
var storePhi = function storePhi(event, phi) {
  map[event] = phi;
};
storePhi('pizza', 0.069);
storePhi('touched tree', -0.081);

// We can check if a property exists on an object by using the in binary
// operator
console.log('pizza' in map);
console.log(map['touched tree']);

// If we want to iterate over all the props of an object and display their
// values we can use for in loop:
for (var event in map) {
  console.log("The correlation for '" + event + "' is " + map[event]);
}

//To find all the types of events that are present in the data set, we simply
//process each entry in turn and then loop over the events in that entry. We
//keep an object phis that has correlation coefficients for all the event types
//we have seen so far. Whenever we run across a type that isn’t in the phis
//object yet, we compute its correlation and add it to the object.

var gatherCorrelations = function gatherCorrelations(journal) {
  var phis = {};
  for (var entry=0; entry < journal.length; entry++) {
    var events = journal[entry].events;
    for (var i=0; i < events.length; i++) {
      var event = events[i];
      if (!(event in phis)) {
        phis[event] = phi(tableFor(event, journal));
      }
    }
  }

  return phis;
};

var correlations = gatherCorrelations(journal);
console.log(correlations.pizza);

for (var event in correlations) {
  console.log(event + ": " + correlations[event]);
}

// We can further filter the list and act according to what we've found
// For example let's return only the events that are between -0.1 and 0.1

console.log("\n LISTING RELEVANT EVENTS: \n\n");
for (var event in correlations) {
  var correlation = correlations[event];
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ": " + correlation);
  }
}

// We can check if an event is directly related (we should get a phi of 1) by
// creating a new event that includes all events with highest coefficient and
// excludes all events with lowest coefficient:

for (var i = 0; i < journal.length; i++) {
  var entry = journal[i];
  if (hasEvent('peanuts', entry) && !hasEvent('brushed teeth', entry)) {
    entry.events.push('peanut teeth');
  }
}

console.log(phi(tableFor('peanut teeth', journal)));
