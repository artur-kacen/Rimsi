/**
 * Created by KACENAR1 on 13.23.11.
*/

var uploadPhoto = function($scope, $upload, file) {
    $scope.upload = $upload.upload({
        url: '/admin/upload',
        file: file
    }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
        });
    //.error(...)
    //.then(success, error, progress);
};

var app = angular.module('rimsi-be.controllers', []);

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

app.controller('AdminMainCtrl', ['$scope', 'ProductsFactory', function($scope, ProductsFactory){
    $scope.products = ProductsFactory.query();
}]);

app.controller('AdminUserCtrl' ['$scope', function($scope){

}]);

function MultiPageHandler($scope, type, MultiPageFactory, $location) {
    $scope.pages = MultiPageFactory.query({type: type});
    $scope.type = type;
    $scope.delete = function (id) {
        if (confirm("Точно хотите удалить?")) {
            MultiPageFactory.delete({id: id});
            $scope.pages = MultiPageFactory.query({type: type});
        }

    };
    $scope.edit = function(id) {
        $location.path("/"+type+"/edit/"+id);
    }
}
function getContentByLang(content, lang) {
    for (var i=0; i<content.length; i++) {
        if (content[i].language == lang) {
            return content[i];
        }
    }
    return null;
}

function MultiPageModifierHandler($scope, type, $upload, MultiPageFactory, $location, $routeParams) {

    $scope.ref = "";
    if (typeof $routeParams.id != 'undefined') {
        $scope.page = MultiPageFactory.get({id: $routeParams.id}, function() {
            $scope.ru_page = getContentByLang($scope.page.content, "ru_RU");
            $scope.lv_page = getContentByLang($scope.page.content, "lv_LV");
            $scope.ref = $scope.page.ref;
        });

    } else {
        $scope.ru_page = {ref: $scope.ref, language: "ru_RU"};
        $scope.lv_page = {ref: $scope.ref, language: "lv_LV"};
        $scope.page = {content: [$scope.ru_page, $scope.lv_page], type: type, ref: $scope.ref}
    }

    var mainPhoto, galleryPhotos;
    var uploadPhotos = function() {
        if (typeof mainPhoto != 'undefined') {
            uploadPhoto($scope, $upload, mainPhoto);
        }
        if (typeof galleryPhotos != 'undefined') {
            for (var i in galleryPhotos) {
                uploadPhoto($scope, $upload, galleryPhotos[i]);
            }
        }
    };

    $scope.save = function() {
        $scope.ref = $scope.ref.trim().replace(" ", "_");
        if ($scope.ref == "") {
            alert("Ключивое слово не указанно!!");
            return;
        }
        $scope.page.ref = $scope.ru_page.ref = $scope.lv_page.ref = $scope.ref;
        if (typeof mainPhoto != 'undefined') {
            $scope.ru_page.mainPhoto = $scope.lv_page.mainPhoto = mainPhoto;
        }
        if (typeof galleryPhotos != 'undefined') {
            if (typeof $scope.page.galleryPhotos == 'undefined') {
                $scope.page.galleryPhotos = galleryPhotos;
            } else {
                $scope.page.galleryPhotos = $scope.page.galleryPhotos.concat(galleryPhotos);
            }
        }
        if (typeof $scope.page._id != 'undefined' && $scope.page._id != null) {
            MultiPageFactory.update($scope.page, function() {
                uploadPhotos();
                $location.path('/'+type);
            });
        } else {
            MultiPageFactory.create($scope.page, function() {
                uploadPhotos();
                $location.path('/'+type);
            });
        }

    };

    $scope.cancel = function () {
        $location.path('/'+type);
    };
    $scope.setMainPhoto = function($file) {
        mainPhoto = $file[0];
    };
    $scope.setGallery = function($files) {
        galleryPhotos = $files;
    };

}
/**
 * Product Controllers
 */
app.controller('ProductPageCtrl', ['$scope', 'MultiPageFactory', '$location', function($scope, MultiPageFactory, $location){
    MultiPageHandler($scope, "products", MultiPageFactory, $location);
}]);

app.controller('ProductPageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload){
        MultiPageModifierHandler($scope, "products", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "продукт";
    }]);
/**
 * Material Controllers
 */
app.controller('MaterialPageCtrl', ['$scope', 'MultiPageFactory', '$location', function($scope, MultiPageFactory, $location){
    MultiPageHandler($scope, "materials", MultiPageFactory, $location);
}]);

app.controller('MaterialPageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload){
        MultiPageModifierHandler($scope, "materials", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "материал";
    }]);

/**
 * News Controllers
 */
app.controller('NewsPageCtrl', ['$scope', 'MultiPageFactory', '$location', function($scope, MultiPageFactory, $location){
    MultiPageHandler($scope, "news", MultiPageFactory, $location);
}]);

app.controller('NewsPageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload){
        MultiPageModifierHandler($scope, "news", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "новость";
    }]);

/**
 * Advices Controllers
 */
app.controller('AdvicePageCtrl', ['$scope', 'MultiPageFactory', '$location', function($scope, MultiPageFactory, $location){
    MultiPageHandler($scope, "advices", MultiPageFactory, $location);
}]);

app.controller('AdvicePageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload){
        MultiPageModifierHandler($scope, "advices", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "совет специалистов";
    }]);


/**
 * Single Page Controllers
 */
function PageCtrl($scope, $routeParams, Factory, $location, $upload, ref) {
    $scope.setMainPhoto = function($file) {
        $scope.mainPhoto = $file[0];
    };
    if (typeof $routeParams.id == 'undefined') {
        $scope.ru_page = Factory.get({ref: ref, language: "ru_RU"});
        $scope.lv_page = Factory.get({ref: ref, language: "lv_LV"});
    } else {
        $scope.ru_page = Factory.get({ref: ref, language: "ru_RU"});
        $scope.lv_page = Factory.get({ref: ref, language: "lv_LV"});
    }
    $scope.delete = function() {
        Factory.delete({pageId: $scope.ru_page.$id});
        Factory.delete({pageId: $scope.lv_page.$id});
    }
    $scope.save = function() {
        if (typeof $scope.mainPhoto != "undefined") {
            $scope.ru_page.mainPhoto = $scope.lv_page.mainPhoto = $scope.mainPhoto;
            uploadPhoto($scope, $upload, $scope.mainPhoto);
        }
        Factory.update($scope.ru_page);
        Factory.update($scope.lv_page);
        $location.path('/' + ref);
    }
}
app.controller('ContactCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "contacts");
}]);
app.controller('IndexCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "index");
}]);
app.controller('ReviewCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "review");
}]);
app.controller('AboutUsCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "about_us");
}]);
app.controller('DeliveryCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "delivery");
}]);
app.controller('MeasurerCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "call_measurer");
}]);
app.controller('AssemblyCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "assembly");
}]);
app.controller('SpecOffersCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageCtrl($scope, $routeParams, PageFactory, $location, $upload, "spec_offers");
}]);

function PageAddCtrl($scope, Factory, $upload, $location, ref) {
    $scope.setMainPhoto = function($file) {
        $scope.mainPhoto = $file[0];
    };
    $scope.ru_page = {ref: ref, language: "ru_RU"};
    $scope.lv_page = {ref: ref, language: "lv_LV"};

    $scope.save = function() {
        if (typeof $scope.mainPhoto != "undefined") {
            $scope.ru_page.mainPhoto = $scope.lv_page.mainPhoto = $scope.mainPhoto;
            uploadPhoto($scope, $upload, $scope.mainPhoto);
        }
        Factory.create($scope.ru_page);
        Factory.create($scope.lv_page);
        $location.path('/' + ref);
    }
}
app.controller('ContactAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "contacts");
}]);
app.controller('IndexAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "index");
}]);
app.controller('ReviewAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "review");
}]);
app.controller('AboutUsAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "about_us");
}]);
app.controller('DeliveryAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "delivery");
}]);
app.controller('MeasurerAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "call_measurer");
}]);
app.controller('AssemblyAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "assembly");
}]);
app.controller('SpecOffersAddCtrl', ['$scope', '$location', '$routeParams', 'PageFactory', '$upload', function ($scope, $location, $routeParams, PageFactory, $upload) {
    PageAddCtrl($scope, PageFactory, $upload, $location, "spec_offers");
}]);
