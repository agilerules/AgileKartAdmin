

angular.module('agileRulesKart').controller('EditAkOptionsController', function($scope, $routeParams, $location, AkOptionsResource , AkOptionGroupsResource, AkProductOptionsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akOptions = new AkOptionsResource(self.original);
            AkOptionGroupsResource.queryAll(function(items) {
                $scope.akOptionGroupsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionGroupId : item.optionGroupId
                    };
                    var labelObject = {
                        value : item.optionGroupId,
                        text : item.optionGroupId
                    };
                    if($scope.akOptions.akOptionGroups && item.optionGroupId == $scope.akOptions.akOptionGroups.optionGroupId) {
                        $scope.akOptionGroupsSelection = labelObject;
                        $scope.akOptions.akOptionGroups = wrappedObject;
                        self.original.akOptionGroups = $scope.akOptions.akOptionGroups;
                    }
                    return labelObject;
                });
            });
            AkProductOptionsResource.queryAll(function(items) {
                $scope.akProductOptionsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productOptionId : item.productOptionId
                    };
                    var labelObject = {
                        value : item.productOptionId,
                        text : item.productOptionId
                    };
                    if($scope.akOptions.akProductOptionses){
                        $.each($scope.akOptions.akProductOptionses, function(idx, element) {
                            if(item.productOptionId == element.productOptionId) {
                                $scope.akProductOptionsesSelection.push(labelObject);
                                $scope.akOptions.akProductOptionses.push(wrappedObject);
                            }
                        });
                        self.original.akProductOptionses = $scope.akOptions.akProductOptionses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkOptions");
        };
        AkOptionsResource.get({AkOptionsId:$routeParams.AkOptionsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akOptions);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akOptions.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkOptions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkOptions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akOptions.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("akOptionGroupsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOptions.akOptionGroups = {};
            $scope.akOptions.akOptionGroups.optionGroupId = selection.value;
        }
    });
    $scope.akProductOptionsesSelection = $scope.akProductOptionsesSelection || [];
    $scope.$watch("akProductOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akOptions) {
            $scope.akOptions.akProductOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.akOptions.akProductOptionses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});