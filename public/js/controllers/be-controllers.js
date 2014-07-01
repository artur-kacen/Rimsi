/**
 * Created by KACENAR1 on 13.23.11.
 */
var baseUrl = window.location.origin;
var uploadPhoto = function ($scope, $upload, file) {
    $scope.upload = $upload.upload({
        url: '/admin/upload',
        file: file
    }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
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

app.controller('AdminMainCtrl', ['$scope', 'MultiPageFactory', function ($scope, MultiPageFactory) {
    $scope.products = MultiPageFactory.query({type: "products"});
    $scope.materials = MultiPageFactory.query({type: "materials"});
    $scope.articles = MultiPageFactory.query({type: "news"});
}]);


function createTable(ngTableParams, inbound, Factory) {
    return new ngTableParams(
        {
            page: 1,           // show first page
            count: 50          // count per page
        },
        {
            getData: function ($defer, params) {
                /* Factory.size(function (data) {
                 params.total(data.length);
                 })*/
                // ajax request to api
                Factory.query({inbound: inbound}, function (data) {
                    $defer.resolve(data);
                });
            }
        });
}

app.controller('EmailInboundCtrl', ['$scope', 'SmtpFactory', 'ngTableParams', '$route', '$location', '$window', 'Email', '$sce',
    function ($scope, SmtpFactory, ngTableParams, $route, $location, $window, Email, $sce) {
        $scope.to_trusted = function(html_code) {
            return $sce.trustAsHtml(html_code);
        }
        $scope.seenFlag = "\\Seen";
        $scope.flaggedFlag = "\\Flagged";
        $scope.type = "Входящии письма";
        $scope.tableParams = createTable(ngTableParams, true, SmtpFactory);
        $scope.openEmail = function (email) {
            if (email.emailContent == undefined) {
                SmtpFactory.get({uid: email.UID}, function (data) {
                    email.showEmail = !email.showEmail;
                    email.emailContent = data;
                });
            } else {
                email.showEmail = !email.showEmail;
                $scope.setSeen(email);
            }
            email.flags.push($scope.seenFlag);
        };
        $scope.deleteEmail = function (email) {
            if (confirm("Точно удаляем письмо - " + email.title + "?")) {
                SmtpFactory.delete({uid: email.UID}, function () {
                    $route.reload();
                })
            }
        };
        $scope.reply = function (email) {
            Email.to = "'" + email.from.name + "'" + " <" + email.from.address + ">";
            Email.inReplyTo = email.messageId;
            if (email.references == undefined) {
                Email.references = [email.messageId];
            } else {
                Email.references = email.references.push(email.messageId);
            }
            Email.subject = email.title;
            Email.html = "<br /><br />------------------------------------------" + email.emailContent.html;
            $location.path("/email/send");
        };

        $scope.replyAll = function (email) {
            Email.cc = email.cc;
            $scope.reply(email);
        };
        $scope.openAttachment = function (email, attach) {
            $window.open(baseUrl+"/smtp/" + email.UID +"/attachment/" + attach.fileName);
        };
        $scope.setUnseen = function(email) {
            SmtpFactory.seen({uid: email.UID, unseen: 1}, function() {
                email.flags = remove(email.flags, $scope.seenFlag);

            })
        };
        $scope.setSeen = function(email) {
            SmtpFactory.seen({uid: email.UID}, function() {
                email.flags.push($scope.seenFlag);
            })
        };
        $scope.setFlagged = function(email) {
            SmtpFactory.flag({uid: email.UID, setFlag: 1}, function() {
                email.flags.push($scope.flaggedFlag);
            })
        };
        $scope.removeFlagged = function(email) {
            SmtpFactory.flag({uid: email.UID}, function() {
                email.flags = remove(email.flags, $scope.flaggedFlag);
            })
        };
        function remove(array, item) {
            var index = array.indexOf(item);
            if (index != -1)
                array.splice(index, 1);
            return array;
        }
    }]);

app.controller('EmailOutboundCtrl', ['$scope', 'SmtpFactory', 'ngTableParams', function ($scope, SmtpFactory, ngTableParams) {
    $scope.type = "исходящии  письма";
    $scope.tableParams = createTable(ngTableParams, false, SmtpFactory);
}]);
app.controller('CreateEmailCtrl', ['$scope', 'SmtpFactory', 'Email', '$location', '$upload',
    function ($scope, SmtpFactory, Email, $location, $upload) {
        $scope.email = Email;
        $scope.sendEmail = function() {
            $scope.email.text = String($scope.email.html).replace(/<[^>]+>/gm, '');
            $scope.upload = $upload.upload({
                url: '/smtp', //upload.php script, node.js route, or servlet url
                // method: POST or PUT,
                // headers: {'headerKey': 'headerValue'},
                // withCredentials: true,
                data: {email: $scope.email},
                file: $scope.files,
                // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
                /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
            }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    alert("Письмо отправленно!");
                    $location.path("/email/in");
                });
            //.error(...)
            //.then(success, error, progress);
        }
            /*$http({
                method: 'POST',
                url: "/smtp",
                //IMPORTANT!!! You might think this should be set to 'multipart/form-data'
                // but this is not true because when we are sending up files the request
                // needs to include a 'boundary' parameter which identifies the boundary
                // name between parts in this multi-part request and setting the Content-type
                // manually will not set this boundary parameter. For whatever reason,
                // setting the Content-type to 'false' will force the request to automatically
                // populate the headers properly including the boundary parameter.
                headers: { 'Content-Type': false },
                //This method will allow us to change how the data is sent up to the server
                // for which we'll need to encapsulate the model data in 'FormData'
                transformRequest: function (data) {
                    var formData = new FormData();
                    //need to convert our json object to a string version of json otherwise
                    // the browser will do a 'toString()' on the object which will result
                    // in the value '[Object object]' on the server.
                    formData.append("email", angular.toJson(data.email));
                    //now add all of the assigned files
                    for (var i = 0; i < data.files; i++) {
                        //add each file to the form data and iteratively name them
                        formData.append("file" + i, data.files[i]);
                    }
                    return formData;
                },
                //Create an object that contains the model and files which will be transformed
                // in the above transformRequest method
                data: { email: $scope.email, files: $scope.files }
            }).
                success(function (data, status, headers, config) {
                    alert("Письмо отправленно!");
                    $location.path("/email/in");
                }).
                error(function (data, status, headers, config) {
                    alert("failed!");
                });
            SmtpFactory.send($scope.email, function(data) {

            })*/

        //an array of files selected
        $scope.files = [];
        $scope.setGallery = function ($files) {
            $scope.files = $files;
        };

        //listen for the file selected event
        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {
                //add the file object to the scope's files collection
                $scope.files.push(args.file);
            });
        });
}]);


app.controller('AdminUserCtrl' ['$scope', function ($scope) {

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
    $scope.edit = function (id) {
        $location.path("/" + type + "/edit/" + id);
    }
}
function getContentByLang(content, lang) {
    for (var i = 0; i < content.length; i++) {
        if (content[i].language == lang) {
            return content[i];
        }
    }
    return null;
}

function MultiPageModifierHandler($scope, type, $upload, MultiPageFactory, $location, $routeParams) {

    $scope.ref = "";
    if (typeof $routeParams.id != 'undefined') {
        $scope.page = MultiPageFactory.get({id: $routeParams.id}, function () {
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
    var uploadPhotos = function (callback) {
        if (typeof mainPhoto != 'undefined') {
            uploadPhoto($scope, $upload, mainPhoto);
        }
        if (typeof galleryPhotos != 'undefined') {
            for (var i in galleryPhotos) {
                uploadPhoto($scope, $upload, galleryPhotos[i]);
            }
        }
        callback();
    };
    $scope.deleteFromGallery = function (index) {
        $scope.page.galleryPhotos.splice(index, 1);
    };
    $scope.deleteMainPhoto = function () {
        $scope.lv_page.mainPhoto = null;
        $scope.ru_page.mainPhoto = null;
    }

    $scope.save = function () {
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
            MultiPageFactory.update($scope.page, function () {
                uploadPhotos($location.path('/' + type));
            });
        } else {
            MultiPageFactory.create($scope.page, function () {
                uploadPhotos($location.path('/' + type));
            });
        }

    };

    $scope.cancel = function () {
        $location.path('/' + type);
    };
    $scope.setMainPhoto = function ($file) {
        mainPhoto = $file[0];
    };
    $scope.setGallery = function ($files) {
        galleryPhotos = $files;
    };

}
/**
 * Product Controllers
 */
app.controller('ProductPageCtrl', ['$scope', 'MultiPageFactory', '$location', function ($scope, MultiPageFactory, $location) {
    MultiPageHandler($scope, "products", MultiPageFactory, $location);
}]);

app.controller('ProductPageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function ($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload) {
        MultiPageModifierHandler($scope, "products", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "продукт";
    }]);
/**
 * Material Controllers
 */
app.controller('MaterialPageCtrl', ['$scope', 'MultiPageFactory', '$location', function ($scope, MultiPageFactory, $location) {
    MultiPageHandler($scope, "materials", MultiPageFactory, $location);
}]);

app.controller('MaterialPageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function ($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload) {
        MultiPageModifierHandler($scope, "materials", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "материал";
    }]);

/**
 * News Controllers
 */
app.controller('NewsPageCtrl', ['$scope', 'MultiPageFactory', '$location', function ($scope, MultiPageFactory, $location) {
    MultiPageHandler($scope, "news", MultiPageFactory, $location);
}]);

app.controller('NewsPageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function ($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload) {
        MultiPageModifierHandler($scope, "news", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "новость";
    }]);

/**
 * Advices Controllers
 */
app.controller('AdvicePageCtrl', ['$scope', 'MultiPageFactory', '$location', function ($scope, MultiPageFactory, $location) {
    MultiPageHandler($scope, "advices", MultiPageFactory, $location);
}]);

app.controller('AdvicePageModifyCtrl', ['$scope', '$location', '$timeout', 'MultiPageFactory', '$routeParams', '$upload',
    function ($scope, $location, $timeout, MultiPageFactory, $routeParams, $upload) {
        MultiPageModifierHandler($scope, "advices", $upload, MultiPageFactory, $location, $routeParams);
        $scope.type_ru = "совет специалистов";
    }]);


/**
 * Single Page Controllers
 */
function PageCtrl($scope, $routeParams, Factory, $location, $upload, ref) {
    $scope.setMainPhoto = function ($file) {
        $scope.mainPhoto = $file[0];
    };
    if (typeof $routeParams.id == 'undefined') {
        $scope.ru_page = Factory.get({ref: ref, language: "ru_RU"});
        $scope.lv_page = Factory.get({ref: ref, language: "lv_LV"});
    } else {
        $scope.ru_page = Factory.get({ref: ref, language: "ru_RU"});
        $scope.lv_page = Factory.get({ref: ref, language: "lv_LV"});
    }
    $scope.delete = function () {
        Factory.delete({pageId: $scope.ru_page.$id});
        Factory.delete({pageId: $scope.lv_page.$id});
    }
    $scope.deleteMainPhoto = function () {
        $scope.lv_page.mainPhoto = null;
        $scope.ru_page.mainPhoto = null;
    }
    $scope.save = function () {
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
    $scope.setMainPhoto = function ($file) {
        $scope.mainPhoto = $file[0];
    };
    $scope.ru_page = {ref: ref, language: "ru_RU"};
    $scope.lv_page = {ref: ref, language: "lv_LV"};

    $scope.save = function () {
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
