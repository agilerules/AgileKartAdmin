angular.module('agileRulesKart').factory('AkOrderDetailsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akorderdetails/:AkOrderDetailsId',{AkOrderDetailsId:'@detailId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});