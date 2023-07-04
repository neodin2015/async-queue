"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("../dist");
var asyncQueue = new dist_1.AsyncQueue();
asyncQueue.add("test1", function (resolve) {
    setTimeout(function () {
        console.log("1");
        resolve();
    }, 5000);
});
asyncQueue.add("test1", function (resolve) {
    setTimeout(function () {
        console.log("2");
        resolve();
    }, 3000);
});
asyncQueue.add("test2", function (resolve) {
    setTimeout(function () {
        console.log("3");
        resolve();
    }, 1000);
});
asyncQueue.add("test2", function (resolve) {
    setTimeout(function () {
        console.log("4");
        resolve();
    }, 1000);
});
