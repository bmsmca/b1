myApp.controller('inventController', function($scope,$route,$routeParams,$http){

	$scope.getinventory = function(){
		$http.get('/api/inventory/').then(function(response){
			$scope.inventory = response.data;
		});
	};

	$scope.showinventory = function(){
		var id = $routeParams.id;
		$http.get('/api/inventory/'+ id).then(function(response){
			$scope.inventory = response.data;
		});
	};

	$scope.addinventory = function(){
		$http.post('/api/inventory/', $scope.inventory).then(function(response){
			window.location.href = '/';
		});
	};

	$scope.updateinventory = function(){
		var id = $routeParams.id;
		$http.put('/api/inventory/'+ id , $scope.inventory).then(function(response){
			window.location.href = '/';
		});
	};
	
	$scope.deleteinventory = function(id){
		var id = id;
		$http.delete('/api/inventory/'+ id).then(function(response){
			$route.reload();
		});
	};
	
});
