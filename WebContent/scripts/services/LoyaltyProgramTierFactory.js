angular.module('agilekartV2').factory('LoyaltyProgramTierResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/loyaltyprogramtiers/:LoyaltyProgramTierId',{LoyaltyProgramTierId:'@tierId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});