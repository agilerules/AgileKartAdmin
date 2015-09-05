angular.module('agilekartV2').factory('TaxRuleResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/taxrules/:TaxRuleId',{TaxRuleId:'@taxRuleId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});