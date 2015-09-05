angular.module('agilekartV2').factory('MerchantCategoryResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantcategories/:MerchantCategoryId',{MerchantCategoryId:'@merchantCategoryId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});