/**
 * Created by KACENAR1 on 13.18.11.
 */
angular.module("rimsi").filter('truncate', function () {
    return function (text, length, end) {
        if (text == undefined)
            return "";
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
});

angular.module("rimsi").filter("language", ['$translate', function($translate) {
    return function (obj, val) {
        var lang = $translate.uses();
        for (var i=0; i<obj.length; i++) {
            if (obj[i].language === lang) {
                if (obj[i].hasOwnProperty(val)) {
                    return obj[i].val;
                } else {
                    return "";
                }
            }
        }
    }
}])