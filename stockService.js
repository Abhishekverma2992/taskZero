'use strict';
var app = angular.module('task');
app.service('stockService',
  function ($http) {
    return {
      getStockDetails: function (companyNumber, duration, cb) {
        var url = constructUrl(companyNumber, duration);
        $http.get(url)
        .success(
          function (data) {
            var stockDetails = [];
            var stockAndDate = data.split('\n').slice(7,7+duration);
            var startingDate = 
              new Date(stockAndDate[0].split(',')[0].split('a')[1]*1000);

            for(var i=1; i<stockAndDate.length; i++) {
              var stockDateDelta = Number(stockAndDate[i].split(',')[0]);
              var stockDate = new Date(startingDate.getTime() +
                  stockDateDelta*24*60*60*1000);
              var stockLocalDate = stockDate.getDate()+'/'+stockDate.getMonth();
              var thisStockDetails = {};
              thisStockDetails.date = stockLocalDate;
              thisStockDetails.stockValue = stockAndDate[i].split(',')[1];

              stockDetails.push(thisStockDetails);

            }
            return cb(null, stockDetails);
          }
        )
        .error(
          function (err) {
            return cb({mesg:err, url:url});
          }
        );
      }
    };

    function constructUrl(companyNumber, duration) {
      return 'http://www.google.com/finance/getprices?q=' +
        companyNumber +
        '&x=BOM&i=86400&p=' + 
        duration + 'd' +
        '&f=c,d&df=cpct&auto=0&ei=Ef6XUYDfCqSTiAKEMg';
    }
  }
);