angular.module('agilekartV2').factory('UserFavouritesResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKart2Rest/rest/userfavourites/:UserFavouritesId',{UserFavouritesId:'@userFavouriteId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});