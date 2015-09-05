angular.module('agilekartV2').factory('MerchantAddressResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantaddresses/:MerchantAddressId',{MerchantAddressId:'@merchantAddressId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});