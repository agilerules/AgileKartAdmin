angular.module('agilekartV2').factory('EventResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/events/:EventId',{EventId:'@eventId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});