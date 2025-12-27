app.factory('cropService', ['$http', '$q', function($http, $q) {
  var service = {};

  service.loadCrops = function() {
    return $http.get('app/data/crops.json');
  };

  // Simple rule-based recommender: filter crops by matching factors.
  service.recommend = function(crops, input) {
    input = input || {};
    var matches = crops.filter(function(c) {
      // allow partial matching: if user didn't provide a field, ignore it
      if (input.soil && c.soil.toLowerCase() !== input.soil.toLowerCase()) return false;
      if (input.rainfall && c.rainfall.toLowerCase() !== input.rainfall.toLowerCase()) return false;
      if (input.temp && c.temp.toLowerCase() !== input.temp.toLowerCase()) return false;
      if (input.region && c.region.toLowerCase() !== input.region.toLowerCase()) return false;
      return true;
    });

    // If no exact matches, return best-effort by matching 3-out-of-4 using a score
    if (matches.length === 0) {
      var scored = crops.map(function(c) {
        var score = 0;
        if (input.soil && c.soil.toLowerCase() === input.soil.toLowerCase()) score++;
        if (input.rainfall && c.rainfall.toLowerCase() === input.rainfall.toLowerCase()) score++;
        if (input.temp && c.temp.toLowerCase() === input.temp.toLowerCase()) score++;
        if (input.region && c.region.toLowerCase() === input.region.toLowerCase()) score++;
        return {crop: c, score: score};
      }).sort(function(a,b){ return b.score - a.score; });

      // return top 3 best scored crops (score > 0)
      return scored.filter(s => s.score>0).slice(0,3).map(s => s.crop);
    }

    return matches;
  };

  return service;
}]);
