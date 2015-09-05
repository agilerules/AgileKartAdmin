angular.module('agilekartV2').factory('FeaturesResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/features/:FeaturesId',{FeaturesId:'@featureId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});