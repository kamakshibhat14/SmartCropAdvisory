app.controller('AuthCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.registerData = {};
  $scope.loginData = {};
  $scope.message = '';

  // Register user -> store in localStorage.users array
  $scope.register = function() {
    var users = JSON.parse(localStorage.getItem('sc_users') || '[]');
    // simple check for duplicate email
    if (users.some(u => u.email === $scope.registerData.email)) {
      $scope.message = 'Email already registered.';
      return;
    }
    users.push({
      name: $scope.registerData.name,
      email: $scope.registerData.email,
      password: $scope.registerData.password
    });
    localStorage.setItem('sc_users', JSON.stringify(users));
    $scope.message = 'Registration successful. Please login.';
    $scope.registerData = {};
    $location.path('/login');
  };

  $scope.login = function() {
    var users = JSON.parse(localStorage.getItem('sc_users') || '[]');
    var found = users.find(u => u.email === $scope.loginData.email && u.password === $scope.loginData.password);
    if (found) {
      localStorage.setItem('sc_currentUser', JSON.stringify(found));
      $scope.message = 'Login successful!';
      // redirect to home
      $location.path('/home');
    } else {
      $scope.message = 'Invalid credentials.';
    }
  };

  $scope.logout = function() {
    localStorage.removeItem('sc_currentUser');
    $location.path('/home');
  };

  $scope.currentUser = function() {
    return JSON.parse(localStorage.getItem('sc_currentUser') || 'null');
  };
}]);
