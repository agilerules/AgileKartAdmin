angular.module('agileRulesKart').factory('AkProductCategoriesResource', function($resource){
    var resource = $resource('http://localhost:8089/AgileKartRest/rest/akproductcategories/:AkProductCategoriesId',{AkProductCategoriesId:'@categoryId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});