

angular.module('agileRulesKart').controller('EditAkUsersController', function($scope, $routeParams, $location, AkUsersResource , AkUserAddressResource, AkOrdersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akUsers = new AkUsersResource(self.original);
            AkUserAddressResource.queryAll(function(items) {
                $scope.akUserAddressesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        addressId : item.addressId
                    };
                    var labelObject = {
                        value : item.addressId,
                        text : item.addressId
                    };
                    if($scope.akUsers.akUserAddresses){
                        $.each($scope.akUsers.akUserAddresses, function(idx, element) {
                            if(item.addressId == element.addressId) {
                                $scope.akUserAddressesSelection.push(labelObject);
                                $scope.akUsers.akUserAddresses.push(wrappedObject);
                            }
                        });
                        self.original.akUserAddresses = $scope.akUsers.akUserAddresses;
                    }
                    return labelObject;
                });
            });
            AkOrdersResource.queryAll(function(items) {
                $scope.akOrdersesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderId : item.orderId
                    };
                    var labelObject = {
                        value : item.orderId,
                        text : item.orderId
                    };
                    if($scope.akUsers.akOrderses){
                        $.each($scope.akUsers.akOrderses, function(idx, element) {
                            if(item.orderId == element.orderId) {
                                $scope.akOrdersesSelection.push(labelObject);
                                $scope.akUsers.akOrderses.push(wrappedObject);
                            }
                        });
                        self.original.akOrderses = $scope.akUsers.akOrderses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkUsers");
        };
        AkUsersResource.get({AkUsersId:$routeParams.AkUsersId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akUsers);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akUsers.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkUsers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkUsers");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akUsers.$remove(successCallback, errorCallback);
    };
    
    $scope.userEmailVerifiedList = [
        "true",  
        " false"  
    ];
    $scope.akUserAddressesSelection = $scope.akUserAddressesSelection || [];
    $scope.$watch("akUserAddressesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akUsers) {
            $scope.akUsers.akUserAddresses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.addressId = selectedItem.value;
                $scope.akUsers.akUserAddresses.push(collectionItem);
            });
        }
    });
    $scope.akOrdersesSelection = $scope.akOrdersesSelection || [];
    $scope.$watch("akOrdersesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akUsers) {
            $scope.akUsers.akOrderses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderId = selectedItem.value;
                $scope.akUsers.akOrderses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});