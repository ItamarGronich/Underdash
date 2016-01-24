/**
 * Underdash library module.
 *
 * use the underscore symbol ( '_' ) to use library methods.  e.g. - <code>_.shuffle();</code>
 * @type      {{removeDuplicates(), flatten, shuffle}}
 * @private  - <_.flatten>, <_.removeDuplicates> and <_.shuffle>
 */
var Underdash = function () {
    'use strict';

    /**
     * @module UTILS - Utilities module
     *                 has basic utility methods
     * @type {{flatten, shuffle, rd}}
     *
     * @API - UTILS.
     */

    var UTILS = function () {

        function flatten(arr, shallow) {
            /* this is the exit condition:
             * if every element in the array is not an array then return the array.
             * in other words if there are no sub-arrays in the master array return the master array.
             * */
            if (arr.every(function (e) {
                return !Array.isArray(e);
            })) {
                return arr;
            } else {
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    if (Array.isArray(arr[i])) {
                        for (var j = 0; j < arr[i].length; j++) {
                            newArr.push(arr[i][j]);
                        }
                    } else {
                        newArr.push(arr[i]);
                    }
                }
                if (!shallow) {
                    return flatten(newArr);
                }
            }
        }

        function removeDuplicates(arr) {
            var newObj = {},
                newArr = [];
            for (var i = 0; i < arr.length; i++) {
                newObj[arr[i]] = arr[i];
            }
            for (var key in newObj) {
                newArr.push(newObj[key]);
            }
            return newArr;
        }

        function shuffle(arr) {
            // Your code here
            for (var i = 0; i < arr.length; i++) {
                var randIndex = Math.round(Math.random() * (arr.length - 1)),
                    current = arr[i],
                    random = arr[randIndex];
                if (current !== random) {
                    arr[i] = random;
                    arr[randIndex] = current;
                }
            }
            return arr;
        }

        return {
            flatten: flatten,
            shuffle: shuffle,
            rd: removeDuplicates
        };
    }();

    var eventBus = function () {

        /**
         *
         * @Object - the events object will hold all events and their listeners and handlers
         */
        var events = {};

        function ifNoType(type) {
            if (!type) {
                throw new Error('first argument: "type" missing.');
            }

            if (typeof type !== 'string') {
                throw new TypeError('"type" argument must be a string');
            }
        }

        /**
         *
         * @param type      - a string containing the name of the desired event
         * @param options   - an Object containing desired customisable properties to set on event.
         * @constructor BusEvent constructor function.
         *
         *              Is used for constructing BusEvent objects to fire with
         *              dispatch
         */
        function BusEvent(type, options) {

            ifNoType(type);

            if (options && typeof options !== 'object') {
                throw new TypeError('second argument - "options" - must be an object');
            }

            this.type = type;

            this.detail = null;

            this.target = null;

            this.timeStamp = Date.now();

            if (options !== null && typeof options === 'object') {
                for (var key in options) {
                    if (key === 'detail' && (typeof options.detail !== 'object' || options.detail === null)) {
                        throw new TypeError('details key in options must be an object');
                    }
                    this[key] = options[key];
                }
            }
        }

        BusEvent.prototype.getType = function () {
            return this.type;
        };
        BusEvent.prototype.getTimeStamp = function () {
            return this.timeStamp;
        };
        BusEvent.prototype.getTarget = function () {
            return this.target;
        };
        BusEvent.prototype.setDetail = function (key, value) {
            if (this.detail === null || typeof this.detail !== 'object') {
                this.detail = {};
            }

            if (!key || !value || typeof key !== 'string' || typeof value !== 'string') {
                throw new TypeError('setDetail must have two arguments, a key and a value. both must be strings');
            }
            this.detail[key] = value;
        };
        BusEvent.prototype.getDetail = function () {
            return this.detail;
        };

        function on(type, callback, user) {

            ifNoType(type);

            if (!callback || typeof callback !== 'function') {
                throw new TypeError('callback isn\'t specified or is not a function');
            }

            if (!user) {
                throw new TypeError('user argument isn\'t specified or is not a truthy value');
            }

            var handlerObj = {};
            handlerObj[user] = callback;

            events[type] = events[type] || [];
            debugger;
            events[type].push(handlerObj);
        }

        function off(type, callback, user) {}

        function emit() {}

        return {
            BusEvent: BusEvent,
            on: on,
            off: off,
            events: events
        };
    }();

    return {
        rd: UTILS.rd,
        flatten: UTILS.flatten,
        shuffle: UTILS.shuffle,
        eventBus: eventBus

    };
}();

var _ = Underdash;

//# sourceMappingURL=Underdash-compiled.js.map