angular.module('agilekartV2').factory('ProductReviewResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/productreviews/:ProductReviewId',{ProductReviewId:'@productReviewId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});