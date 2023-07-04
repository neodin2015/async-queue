"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lock = void 0;
var Lock = /** @class */ (function () {
    function Lock(options) {
        var _this = this;
        this.callback = {};
        this.queue = {};
        this.options = {
            autorun: true,
            maxSizeQueue: 1000,
        };
        this.resolve = function (key) {
            delete _this.callback[key];
            if (_this.queue[key].length) {
                _this.queue[key][0]();
                _this.queue[key].splice(0, 1);
            }
        };
        this.run = function (key) {
            if (typeof _this.callback[key] === 'function') {
                _this.callback[key]();
            }
        };
        this.add = function (key, callback, errorCallback) {
            if (!_this.callback[key]) {
                _this.callback[key] = function () { return callback(function () { return _this.resolve(key); }); };
                if (typeof _this.callback[key] === 'function' && _this.options.autorun) {
                    _this.callback[key]();
                }
            }
            else {
                if (_this.queue[key].length + 1 > _this.options.maxSizeQueue) {
                    errorCallback(new Error("Maximum queue size exceeded"));
                }
                else {
                    _this.queue[key].push(function () { return callback(function () { return _this.resolve(key); }); });
                }
            }
        };
        this.options = __assign(__assign({}, this.options), options);
    }
    return Lock;
}());
exports.Lock = Lock;
