angular.module('agilekartV2').factory('TaxResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/taxes/:TaxId',{TaxId:'@taxId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});