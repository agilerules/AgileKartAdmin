angular.module('agilekartV2').factory('ProductOptionResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/productoptions/:ProductOptionId',{ProductOptionId:'@productOptionId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});