angular.module('agilekartV2').factory('ProductCategoryResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/productcategories/:ProductCategoryId',{ProductCategoryId:'@productCategoryId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});