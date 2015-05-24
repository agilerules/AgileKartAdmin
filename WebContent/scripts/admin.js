'use strict';

angular.module('agileRulesKart',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/AkCategoryOptions',{templateUrl:'views/AkCategoryOptions/search.html',controller:'SearchAkCategoryOptionsController'})
      .when('/AkCategoryOptions/new',{templateUrl:'views/AkCategoryOptions/detail.html',controller:'NewAkCategoryOptionsController'})
      .when('/AkCategoryOptions/edit/:AkCategoryOptionsId',{templateUrl:'views/AkCategoryOptions/detail.html',controller:'EditAkCategoryOptionsController'})
      .when('/AkOptionGroups',{templateUrl:'views/AkOptionGroups/search.html',controller:'SearchAkOptionGroupsController'})
      .when('/AkOptionGroups/new',{templateUrl:'views/AkOptionGroups/detail.html',controller:'NewAkOptionGroupsController'})
      .when('/AkOptionGroups/edit/:AkOptionGroupsId',{templateUrl:'views/AkOptionGroups/detail.html',controller:'EditAkOptionGroupsController'})
      .when('/AkOptions',{templateUrl:'views/AkOptions/search.html',controller:'SearchAkOptionsController'})
      .when('/AkOptions/new',{templateUrl:'views/AkOptions/detail.html',controller:'NewAkOptionsController'})
      .when('/AkOptions/edit/:AkOptionsId',{templateUrl:'views/AkOptions/detail.html',controller:'EditAkOptionsController'})
      .when('/AkOrderDetails',{templateUrl:'views/AkOrderDetails/search.html',controller:'SearchAkOrderDetailsController'})
      .when('/AkOrderDetails/new',{templateUrl:'views/AkOrderDetails/detail.html',controller:'NewAkOrderDetailsController'})
      .when('/AkOrderDetails/edit/:AkOrderDetailsId',{templateUrl:'views/AkOrderDetails/detail.html',controller:'EditAkOrderDetailsController'})
      .when('/AkOrders',{templateUrl:'views/AkOrders/search.html',controller:'SearchAkOrdersController'})
      .when('/AkOrders/new',{templateUrl:'views/AkOrders/detail.html',controller:'NewAkOrdersController'})
      .when('/AkOrders/edit/:AkOrdersId',{templateUrl:'views/AkOrders/detail.html',controller:'EditAkOrdersController'})
      .when('/AkProductCategories',{templateUrl:'views/AkProductCategories/search.html',controller:'SearchAkProductCategoriesController'})
      .when('/AkProductCategories/new',{templateUrl:'views/AkProductCategories/detail.html',controller:'NewAkProductCategoriesController'})
      .when('/AkProductCategories/edit/:AkProductCategoriesId',{templateUrl:'views/AkProductCategories/detail.html',controller:'EditAkProductCategoriesController'})
      .when('/AkProductOptions',{templateUrl:'views/AkProductOptions/search.html',controller:'SearchAkProductOptionsController'})
      .when('/AkProductOptions/new',{templateUrl:'views/AkProductOptions/detail.html',controller:'NewAkProductOptionsController'})
      .when('/AkProductOptions/edit/:AkProductOptionsId',{templateUrl:'views/AkProductOptions/detail.html',controller:'EditAkProductOptionsController'})
      .when('/AkProducts',{templateUrl:'views/AkProducts/search.html',controller:'SearchAkProductsController'})
      .when('/AkProducts/new',{templateUrl:'views/AkProducts/detail.html',controller:'NewAkProductsController'})
      .when('/AkProducts/edit/:AkProductsId',{templateUrl:'views/AkProducts/detail.html',controller:'EditAkProductsController'})
      .when('/AkUsers',{templateUrl:'views/AkUsers/search.html',controller:'SearchAkUsersController'})
      .when('/AkUsers/new',{templateUrl:'views/AkUsers/detail.html',controller:'NewAkUsersController'})
      .when('/AkUsers/edit/:AkUsersId',{templateUrl:'views/AkUsers/detail.html',controller:'EditAkUsersController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
