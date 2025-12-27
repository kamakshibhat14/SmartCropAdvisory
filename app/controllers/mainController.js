app.controller('MainCtrl', ['$scope', 'cropService', '$timeout', function($scope, cropService, $timeout) {
  $scope.user = {
    soil: '',
    rainfall: '',
    temp: '',
    region: ''
  };
  $scope.suggestions = [];
  $scope.cropsAll = [];

  // load dataset once
  cropService.loadCrops().then(function(res) {
    $scope.cropsAll = res.data;
  }, function() {
    console.error('Failed to load crops.json');
  });

  $scope.getAdvisory = function() {
    $scope.suggestions = cropService.recommend($scope.cropsAll, $scope.user);
    if ($scope.suggestions.length === 0) {
      $scope.noResults = true;
    } else {
      $scope.noResults = false;
    }
  };

  // Dashboard: prepare Chart.js dataset
  $scope.drawChart = function() {
    var ctx = document.getElementById('cropChart');
    if (!ctx) return;
    // sample labels and data taken from cropsAll or fallback
    var labels = $scope.cropsAll.map(c => c.crop);
    var rainfall = $scope.cropsAll.map(c => c.sampleRain || 800); // sampleRain used in JSON
    // destroy existing chart instance if present
    if ($scope._chart) {
      $scope._chart.destroy();
    }
    $scope._chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Avg Recommended Rainfall (mm)',
          data: rainfall,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      }
    });
  };

  // init chart after a short delay (when view loads)
  $scope.init = function() {
    $timeout(function(){ $scope.drawChart(); }, 250);
  };
}]);
