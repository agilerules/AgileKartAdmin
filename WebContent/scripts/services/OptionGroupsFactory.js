angular.module('agilekartV2').factory('OptionGroupsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/optiongroups/:OptionGroupsId',{OptionGroupsId:'@optionGroupId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});