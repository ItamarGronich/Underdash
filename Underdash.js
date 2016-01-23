/**
 * Underdash library module.
 *
 * use the underscore symbol ( '_' ) to use library methods.  e.g. - <code>_.shuffle();</code>
 * @type      {{removeDuplicates(), flatten, shuffle}}
 * @private  - <_.flatten>, <_.removeDuplicates> and <_.shuffle
 */
var _ = (function(){


    function flatten(arr, shallow) {
        // this is the exit condition:
        // if every element in the array is not an array then return the array.
        // in other words if there are no sub-arrays in the master array return the master array.
        if(arr.every(function(e){return !Array.isArray(e)})){
            return arr;
        }
        // end of exit condition.

        //
        else {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    arr[i].forEach(function(e){newArr.push(e)});
                } else {
                    newArr.push(arr[i])
                }
            }
            if (!shallow) {
                return flatten(newArr);
            }
        }
    }

    function removeDuplicates (arr) {
        // Your code here
        arr = arr.sort().filter(function(el,i,a){return !(el === a[i-1]) && true;});return arr;}

    Array.prototype.removeDuplicates = function(arr){
        var newObj = {};
        arr.forEach(function(el){
            newObj[el] = el;
        });
        return newObj;
    };

    function shuffle (arr) {
        // Your code here
        for (var i = 0; i < arr.length; i++) {
            var randIndex = Math.round(Math.random() * (arr.length - 1)),
                current = arr[i],
                random = arr[randIndex];
            if(current !== random) {
                arr[i] = random;
                arr[randIndex] = current;
            }

        }
        return arr;
    }

    return {
        removeDuplicates: removeDuplicates,
        flatten: flatten,
        shuffle: shuffle
    }
})();
