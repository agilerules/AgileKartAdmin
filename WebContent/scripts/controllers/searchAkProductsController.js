

angular.module('agileRulesKart').controller('SearchAkProductsController', function($scope, $http, AkProductsResource , AkProductCategoriesResource, AkOrderDetailsResource, AkProductOptionsResource) {

    $scope.search={};
    $scope.currentPage = 0;
    $scope.pageSize= 10;
    $scope.searchResults = [];
    $scope.filteredResults = [];
    $scope.pageRange = [];
    $scope.numberOfPages = function() {
        var result = Math.ceil($scope.filteredResults.length/$scope.pageSize);
        var max = (result == 0) ? 1 : result;
        $scope.pageRange = [];
        for(var ctr=0;ctr<max;ctr++) {
            $scope.pageRange.push(ctr);
        }
        return max;
    };
    $scope.akProductCategoriesList = AkProductCategoriesResource.queryAll();
    $scope.productOnlineOnlyList = [
        "true",
        " false"
    ];
    $scope.productUnlimitedList = [
        "true",
        " false"
    ];

    $scope.performSearch = function() {
        $scope.searchResults = AkProductsResource.queryAll(function(){
            $scope.numberOfPages();
        });
    };
    
    $scope.previous = function() {
       if($scope.currentPage > 0) {
           $scope.currentPage--;
       }
    };
    
    $scope.next = function() {
       if($scope.currentPage < ($scope.numberOfPages() - 1) ) {
           $scope.currentPage++;
       }
    };
    
    $scope.setPage = function(n) {
       $scope.currentPage = n;
    };

    $scope.performSearch();
});