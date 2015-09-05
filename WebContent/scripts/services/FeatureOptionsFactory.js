angular.module('agilekartV2').factory('FeatureOptionsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/featureoptions/:FeatureOptionsId',{FeatureOptionsId:'@featureOptionsId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});