angular.module('agilekartV2').factory('OrderStatusResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/orderstatuses/:OrderStatusId',{OrderStatusId:'@orderStatusId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});