angular.module('agileRulesKart').factory('AkUserAddressResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akuseraddresses/:AkUserAddressId',{AkUserAddressId:'@addressId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});