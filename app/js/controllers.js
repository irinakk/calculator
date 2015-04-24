var calculateCtrlModule = angular.module('calculateCtrlModule', []);

calculateCtrlModule.controller('CalculateCtrl', ['$scope',
  function($scope) {
    $scope.expression = "";
    $scope.tempVal = "";
    $scope.digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    $scope.operators = ["+", "-", "×", "÷"];
    $scope.equals = "="
    $scope.dot = "."
    $scope.zero = "0"

    $scope.calculate = function() {
      if($scope.tempVal.replace('×', '*').replace('÷', '/').match(/[\+\-\*\/]$/)){
        $scope.tempVal = $scope.tempVal.substr(0, $scope.tempVal.length-1);
        $scope.expression = $scope.tempVal;
      }
      if ($scope.tempVal.length !== 0) {
        $scope.manageFloats();
        $scope.expression = eval($scope.tempVal.replace('×', '*').replace('÷', '/'));
        $scope.tempVal = "";
      }
    }

    $scope.showDigits = function(val) {
      if ($scope.tempVal === "0") {
        $scope.tempVal = val;
        $scope.expression = $scope.tempVal;
      } else {
        $scope.tempVal += val
        $scope.expression = $scope.tempVal;
      }
    }

    $scope.showOperators = function(val) {
      if ($scope.tempVal.replace('×', '*').replace('÷', '/').match(/[\+\-\*\/]$/)) {
        $scope.tempVal = $scope.tempVal.substring(0, $scope.tempVal.length - 1);
        $scope.tempVal += val;
        $scope.expression = $scope.tempVal;
      } else if ($scope.expression.length !== 0) {
        $scope.tempVal = $scope.expression;
        $scope.tempVal += val;
        $scope.expression = $scope.tempVal;
      }
    }

    $scope.showDot = function() {
      if (!$scope.tempVal.match(/\./) || $scope.tempVal.match(/\./) && $scope.tempVal.substring($scope.tempVal.lastIndexOf('.')).replace('×', '*').replace('÷', '/').match(/[\+\-\*\/]/)) {
        $scope.tempVal += $scope.dot;
        $scope.expression = $scope.tempVal;
      }
    }

    $scope.manageFloats = function() {
      if(!$scope.expression.match(/\./)){
        return;
      }
      var arr1 = $scope.expression.replace(/(\+|\-)/g, " $1 ").split(" ");
      var arr2 = [];
      var max_precision = 0;
      for (var i = 0, len = arr1.length; i < len; i++) {
        arr1[i] = {
          numbers: arr1[i].replace('×', '*').replace('÷', '/').replace(/(\*|\/)/g, " $1 ").split(" "),
          count: 0
        };
        for (var j = 0, length = arr1[i].numbers.length; j < length; j++) {
          if (!arr1[i].numbers[j].match(/[\+\-\*\/]/)) {
            var precision = 0;
            if (arr1[i].numbers[j].indexOf('.') >= 0) {
              precision = arr1[i].numbers[j].length - 1 - arr1[i].numbers[j].indexOf('.');
              arr1[i].numbers[j] = arr1[i].numbers[j].substring(0, arr1[i].numbers[j].indexOf('.')) + arr1[i].numbers[j].substring(arr1[i].numbers[j].indexOf('.') + 1);
              arr1[i].count += precision;
            }
          }
        }
        if (max_precision < arr1[i].count) {
          max_precision = arr1[i].count;
        }
      }
      for (var i = 0, len = arr1.length; i < len; i++) {
        if (!arr1[i].numbers[0].match(/[\+\-\*\/]/)) {
          arr1[i].numbers[0] *= Math.pow(10, max_precision - arr1[i].count);
        }
        arr2[i] = arr1[i].numbers.join("");
      }
      $scope.tempVal = '(' + arr2.join("") + ")/" + Math.pow(10, max_precision);
    }
  }
])