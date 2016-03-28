'use strict';

angular.module('task', [])
  .controller('myController',
    function ($scope, stockService) {
      $scope.companyModeMap = {
          'airtel'  : 532454,
          'icici'   : 532174,
          'tcs'     : 532540,
          'ntt'     : 532174
      };
      $scope.companyList = Object.keys($scope.companyModeMap);
      $scope.boxImages = [
        {title:"Angular1", imgUrl : 'images/angular1.png'},
        {title:"Angular2", imgUrl : 'images/angular2.png'},
        {title:"Angular3", imgUrl : 'images/angular3.png'},
        {title:"Angular4", imgUrl :'images/angular4.png'}
      ];
      $scope.showModal = function (image) {
        $scope.selectedBox = image ;
        $("#myModal").modal('show');
      };

      function drawChart (company, stockDetails) {
        var stockValues = stockDetails.map(function(obj){return obj.stockValue;});
        var stockLabels = stockDetails.map(function(obj){return obj.date;});
        var data = {
          labels: stockLabels,
          series:[stockValues]
        }; 
        var options = {
          width:200,
          height:150
        };
        new Chartist.Line('#'+company,data,options);
      }
      
      function callServiceAndDrawChart(companyName) {
        stockService.getStockDetails($scope.companyModeMap[companyName], 7,
          function (err, stockDetails) {
            if (!err)
              drawChart(companyName,  stockDetails);
            else
              console.log('Got error while fetching url: ', err.url);
          }
        );
      }

      Object.keys($scope.companyModeMap).forEach(
        function (companyName) {
          callServiceAndDrawChart(companyName);    
        }
      );
      // Right Section Code
      $scope.companiesList=[
        {name:'lorem', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name:'ipsum', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name:'dolor', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name:'sit', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name:'amet', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name:'adipisicing', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name:'elit', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name:'sed', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
      ];

      $scope.toggle = false;
      $scope.delete = function (company) {
        $scope.companiesList =
          $scope.companiesList.filter(
            function (eachCompany) {
              return eachCompany.name !== company.name;
            }
          );
      };
      $scope.showDetails = function (company) {
        company.showDetails = !company.showDetails;
      };
    }
  );

  
    
    