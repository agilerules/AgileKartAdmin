angular.module('agilekartV2').factory('SequenceKeyTableResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/sequencekeytables/:SequenceKeyTableId',{SequenceKeyTableId:'@tableId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});