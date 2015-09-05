angular.module('agilekartV2').factory('MerchantResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/merchants/:MerchantId',{MerchantId:'@merchantId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});