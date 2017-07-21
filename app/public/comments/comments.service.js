(function() {
  'use strict';

  angular.module('reddit')
    .service('commentsService', commentsService);

  commentsService.$inject = ['$http'];

  function commentsService($http) {
    console.log("hello");


    this.createComment = function createComment(id, comment) {
      return $http.post(`/api/posts/${id}/comments`, comment)
        .then(function(results) {
          return results.data;
        });
    };

    this.deleteComment = function deleteComment(postId, commentId) {
      return $http.delete(`/api/posts/${postId}/comments/${commentId}`);
    };

    this.copy = function copy(comment) {
      return angular.copy(comment);
    };

    this.editComment = function editComment(postId, comment) {
      return $http.patch(`/api/posts/${postId}/comments/${comment.id}`, comment);
    };
  }
}());
