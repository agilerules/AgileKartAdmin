angular.module('agilekartV2').factory('MerchantPaymentGatewayResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantpaymentgateways/:MerchantPaymentGatewayId',{MerchantPaymentGatewayId:'@merchantPaymentGatewayId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});