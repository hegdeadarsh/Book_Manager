var bookApp = angular
  .module("bookModule", ["ngRoute"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "form.html",
        controller: "bookController",
      })
      .otherwise({
        redirectTo: "/",
      });
  })
  .controller("bookController", function ($scope, $location) {
    $scope.books = [];
    $scope.book = {};
    $scope.editing = false;
    $scope.viewForm = true;
    $scope.viewTable = false;

    $scope.showForm = function () {
      $scope.viewForm = true;
      $scope.editing = false;
      $scope.viewTable = false;
      $scope.book = {};
    };

    $scope.saveForm = function () {
      if ($scope.editing) {
        var index = findBookIndex($scope.book.id);
        if (index !== -1) {
          $scope.books[index] = angular.copy($scope.book);
          $scope.cancelForm();
        }
      } else {
        $scope.book.id = generateId();
        $scope.books.push(angular.copy($scope.book));
        $scope.cancelForm();
      }
      $scope.viewTable = true;
      $scope.viewForm = false;
      console.log($scope.books);
    };

    $scope.editBook = function (book) {
      $scope.book = angular.copy(book);
      $scope.editing = true;
      $scope.viewForm = true;
      $scope.viewTable = false;
      $location.path("/");
    };

    $scope.deleteBook = function (book) {
      var index = findBookIndex(book.id);
      if (index !== -1) {
        $scope.books.splice(index, 1);
      }
    };

    $scope.cancelForm = function () {
      $scope.book = {};
      $scope.editing = false;
      $scope.viewForm = true;
    };

    function generateId() {
      return $scope.books.length + 1;
    }

    function findBookIndex(id) {
      for (var i = 0; i < $scope.books.length; i++) {
        if ($scope.books[i].id === id) {
          return i;
        }
      }
      return -1;
    }
  });
