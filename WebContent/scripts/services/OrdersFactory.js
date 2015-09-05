angular.module('agilekartV2').factory('OrdersResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/orders/:OrdersId',{OrdersId:'@orderId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});