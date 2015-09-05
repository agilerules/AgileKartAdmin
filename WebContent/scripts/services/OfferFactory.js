angular.module('agilekartV2').factory('OfferResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/offers/:OfferId',{OfferId:'@offerId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});