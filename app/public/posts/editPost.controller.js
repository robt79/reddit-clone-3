(function() {
  angular.module('reddit')
    .controller('EditPostController', EditPostController)

  function EditPostController($http, $stateParams, $state) {
    const vm = this
    console.log('edit controller is working');

    vm.$onInit = function() {
      $http.get('/api/posts/' + $stateParams.id, $stateParams).then(res => {
        console.log(res);
        vm.editedPost = res.data
      })
    }
    vm.editPost = function(id) {
      console.log(vm.editedPost);
      console.log('id is', id);
      $http.patch('/api/posts/' + id, vm.editedPost).then(res => {
        console.log(res);
        $state.go('list')
      })

    }
  }
})()
