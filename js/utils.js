/**
 * Created by Ruslan on 03.01.2016.
 */

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randomIntUniform(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/*
 Returns a random element from a given array
 */
function randomElem(arr) {
    return arr[randomIntUniform(0, arr.length)];
}


/*
 Show error
 */
function throwError(text) {
    alert(text);
}