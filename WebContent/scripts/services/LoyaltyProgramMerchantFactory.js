angular.module('agilekartV2').factory('LoyaltyProgramMerchantResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/loyaltyprogrammerchants/:LoyaltyProgramMerchantId',{LoyaltyProgramMerchantId:'@loyaltyProgramMerchantId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});