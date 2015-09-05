angular.module('agilekartV2').factory('UserRewardsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/userrewards/:UserRewardsId',{UserRewardsId:'@rewardId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});