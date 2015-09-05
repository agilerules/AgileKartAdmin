angular.module('agilekartV2').factory('LoyaltyEventDetailsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/loyaltyeventdetails/:LoyaltyEventDetailsId',{LoyaltyEventDetailsId:'@loyaltyEventDetailsId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});