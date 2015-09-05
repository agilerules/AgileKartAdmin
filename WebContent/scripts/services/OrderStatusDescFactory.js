angular.module('agilekartV2').factory('OrderStatusDescResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/orderstatusdescs/:OrderStatusDescId',{OrderStatusDescId:'@orderStatusDescId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});