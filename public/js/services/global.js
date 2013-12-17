var global = angular.module('rimsi-be.global', []);
global.factory("GlobalFactory", [function() {
    var _this = this;
    _this._data = {
        user: window.user,
        authenticated: !! window.user
    };

    return _this._data;
}]);