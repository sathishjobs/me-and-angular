'use strict';

angular.module('confusionApp')

.controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.feedback = {
        name: "",
        email: "",
        feedback_txt: "",
        };
    $scope.success_msg=false;
    $scope.loading= false;

     $scope.sendFeedback = function () {
    $scope.loading= true;
            console.log($scope.feedback);
            feedbackFactory.save($scope.feedback,function(){
                //console.log("feedback stored successfully");
                $scope.loading=false;
                $scope.success_msg=true;
                $scope.feedback = {
                        name: "",
                        email: "",
                        feedback_txt: ""
                        }
                $scope.feedbackForm.$setPristine();
            });
            

        };
    
}])

.controller('HomeController', ['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory', function ($scope, menuFactory, corporateFactory, promotionFactory) {
    $scope.showDish = false;
    $scope.showLeader = false;
    $scope.showPromotion = false;
    $scope.message = "Loading ...";
    //Getting leaders data from corporateFactory
    var leaders = corporateFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var leaders = response;
                $scope.leader = leaders[0];
                $scope.showLeader = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    //Getting dishes data from menuFactory
    $scope.dish = menuFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var dishes = response;
                $scope.dish = dishes[0];
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    //Getting promotions data from promotionFactory with which promotion has featured true using query paramater
    var promotions = promotionFactory.query({
        featured: "true"
    })
    .$promise.then(
            function (response) {
                var promotions = response;
                $scope.promotion = promotions[0];
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

    $scope.leaders = corporateFactory.query();

}]);