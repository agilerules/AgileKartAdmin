angular.module('agilekartV2').factory('OrderDetailsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/orderdetails/:OrderDetailsId',{OrderDetailsId:'@detailId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});