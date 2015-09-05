angular.module('agilekartV2').factory('MerchantFeaturesResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantfeatures/:MerchantFeaturesId',{MerchantFeaturesId:'@merchantFeaturesId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});