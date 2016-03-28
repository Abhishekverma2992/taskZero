
'use strict';
angular
.module('myapp',[])
.controller('myController', function($scope){
  $scope.companiesList=[
  {name:'airtel', description:'description from Airtel'},
  {name: 'icici',description:'description from ICICI'},
  {name: 'tcs',description:'description from TCS'},
  {name: 'reliance',description:'description from Reliance'}

  ];
  $scope.toggle = false;
  $scope.delete = function (company) {
    console.log('deleting company',company.name);
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
});
