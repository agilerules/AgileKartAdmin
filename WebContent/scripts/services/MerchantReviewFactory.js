angular.module('agilekartV2').factory('MerchantReviewResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantreviews/:MerchantReviewId',{MerchantReviewId:'@merchantReviewId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});