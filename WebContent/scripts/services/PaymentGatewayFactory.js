angular.module('agilekartV2').factory('PaymentGatewayResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/paymentgateways/:PaymentGatewayId',{PaymentGatewayId:'@paymentGatewayId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});