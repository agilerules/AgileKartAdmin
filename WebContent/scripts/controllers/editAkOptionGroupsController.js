

angular.module('agileRulesKart').controller('EditAkOptionGroupsController', function($scope, $routeParams, $location, AkOptionGroupsResource , AkProductOptionsResource, AkOptionsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akOptionGroups = new AkOptionGroupsResource(self.original);
            AkProductOptionsResource.queryAll(function(items) {
                $scope.akProductOptionsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productOptionId : item.productOptionId
                    };
                    var labelObject = {
                        value : item.productOptionId,
                        text : item.productOptionId
                    };
                    if($scope.akOptionGroups.akProductOptionses){
                        $.each($scope.akOptionGroups.akProductOptionses, function(idx, element) {
                            if(item.productOptionId == element.productOptionId) {
                                $scope.akProductOptionsesSelection.push(labelObject);
                                $scope.akOptionGroups.akProductOptionses.push(wrappedObject);
                            }
                        });
                        self.original.akProductOptionses = $scope.akOptionGroups.akProductOptionses;
                    }
                    return labelObject;
                });
            });
            AkOptionsResource.queryAll(function(items) {
                $scope.akOptionsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionId : item.optionId
                    };
                    var labelObject = {
                        value : item.optionId,
                        text : item.optionId
                    };
                    if($scope.akOptionGroups.akOptionses){
                        $.each($scope.akOptionGroups.akOptionses, function(idx, element) {
                            if(item.optionId == element.optionId) {
                                $scope.akOptionsesSelection.push(labelObject);
                                $scope.akOptionGroups.akOptionses.push(wrappedObject);
                            }
                        });
                        self.original.akOptionses = $scope.akOptionGroups.akOptionses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkOptionGroups");
        };
        AkOptionGroupsResource.get({AkOptionGroupsId:$routeParams.AkOptionGroupsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akOptionGroups);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akOptionGroups.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkOptionGroups");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkOptionGroups");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akOptionGroups.$remove(successCallback, errorCallback);
    };
    
    $scope.akProductOptionsesSelection = $scope.akProductOptionsesSelection || [];
    $scope.$watch("akProductOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akOptionGroups) {
            $scope.akOptionGroups.akProductOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.akOptionGroups.akProductOptionses.push(collectionItem);
            });
        }
    });
    $scope.akOptionsesSelection = $scope.akOptionsesSelection || [];
    $scope.$watch("akOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akOptionGroups) {
            $scope.akOptionGroups.akOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.optionId = selectedItem.value;
                $scope.akOptionGroups.akOptionses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});