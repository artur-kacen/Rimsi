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


/**
 * Product Controllers
 */

app.controller('AdminProductMainCtrl', ['$scope', 'ProductsFactory', 'ProductFactory' , '$location', function($scope, ProductsFactory, ProductFactory, $location){
    $scope.products = ProductsFactory.query();

    $scope.delete = function (id) {
        ProductFactory.delete({productId: id});
        $scope.products = ProductsFactory.query();
    };
    $scope.edit = function(id) {
        $location.path("/products/edit/"+id);
    }
}]);

app.controller('AdminProductCtrl', ['$scope', '$location', '$timeout', 'ProductsFactory', 'ProductFactory', '$routeParams', '$upload',
function($scope, $location, $timeout, ProductsFactory, ProductFactory, $routeParams, $upload){
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
    }

    $scope.save = function() {
        if (typeof mainPhoto != 'undefined') {
            $scope.product.mainPhoto = mainPhoto;
        }
        if (typeof galleryPhotos != 'undefined') {
            if (typeof $scope.product.galleryPhotos == 'undefined') {
                $scope.product.galleryPhotos = galleryPhotos;
            } else {
                $scope.product.galleryPhotos = $scope.product.galleryPhotos.concat(galleryPhotos);
            }
        }
        if ($scope.product._id != undefined && $scope.product._id != null) {
            ProductFactory.update($scope.product, function() {
                uploadPhotos();
            });
        } else {
            ProductsFactory.create($scope.product, function() {
                uploadPhotos();
            });
        }
        $location.path('/products');
    };
    $scope.cancel = function () {
        $location.path('/products');
    };
    $scope.setMainPhoto = function($file) {
        mainPhoto = $file[0];
    };
    $scope.setGallery = function($files) {
        galleryPhotos = $files;
    };

    if (typeof $routeParams.id != 'undefined' && $routeParams.id != null ) {
        $scope.product = ProductFactory.get({productId: $routeParams.id})
    } else {
        $scope.product = {content: [{language: 'ru'}, {language: 'lv'}]};
    }

}]);

app.controller('AdminMaterialMainCtrl', ['$scope', 'MaterialsFactory', 'MaterialFactory' , '$location', function($scope, MaterialsFactory, MaterialFactory, $location){
    $scope.materials = MaterialsFactory.query();

    $scope.delete = function (id) {
        MaterialFactory.delete({materialId: id});
        $scope.materials = MaterialsFactory.query();
    };
    $scope.edit = function(id) {
        $location.path("/materials/edit/"+id);
    }
}]);

app.controller('AdminMaterialCtrl', ['$scope', '$location', '$timeout', 'MaterialsFactory', 'MaterialFactory', '$routeParams', '$upload',
    function($scope, $location, $timeout, MaterialsFactory, MaterialFactory, $routeParams, $upload){
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
        }

        $scope.save = function() {
            if (typeof mainPhoto != 'undefined') {
                $scope.material.mainPhoto = mainPhoto;
            }
            if (typeof galleryPhotos != 'undefined') {
                if (typeof $scope.material.galleryPhotos == 'undefined') {
                    $scope.material.galleryPhotos = galleryPhotos;
                } else {
                    $scope.material.galleryPhotos = $scope.material.galleryPhotos.concat(galleryPhotos);
                }
            }
            if ($scope.material._id != undefined && $scope.material._id != null) {
                MaterialFactory.update($scope.material, function() {
                    uploadPhotos();
                });
            } else {
                MaterialsFactory.create($scope.material, function() {
                    uploadPhotos();
                });
            }
            $location.path('/materials');
        };
        $scope.cancel = function () {
            $location.path('/materials');
        };
        $scope.setMainPhoto = function($file) {
            mainPhoto = $file[0];
        };
        $scope.setGallery = function($files) {
            galleryPhotos = $files;
        };

        if (typeof $routeParams.id != 'undefined' && $routeParams.id != null ) {
            $scope.material = MaterialFactory.get({materialId: $routeParams.id})
        } else {
            $scope.material = {content: [{language: 'ru'}, {language: 'lv'}]};
        }

    }]);

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
