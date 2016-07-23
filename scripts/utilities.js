function forEach(array, callback) {
    "use strict";
    var i;
    for (i = 0; i < array.length; i += 1) {
        callback(array[i]);
    }
}