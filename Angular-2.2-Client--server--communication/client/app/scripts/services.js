'use strict';

angular.module('confusionApp')
.constant("baseURL", "http://localhost:3000/")
.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])
  
.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "promotions/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])



.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}]);