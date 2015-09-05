angular.module('agilekartV2').factory('CategoryOptionsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/categoryoptions/:CategoryOptionsId',{CategoryOptionsId:'@categoryOptionsId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});