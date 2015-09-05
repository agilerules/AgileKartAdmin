angular.module('agilekartV2').factory('OptionsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/options/:OptionsId',{OptionsId:'@optionId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});