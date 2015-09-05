angular.module('agilekartV2').factory('UserAddressResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/useraddresses/:UserAddressId',{UserAddressId:'@addressId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});