angular.module('agilekartV2').factory('UsersResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/users/:UsersId',{UsersId:'@userId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});