(function() {
    'use strict'

    angular.module('app')
      .service('PostService', service)

    service.$inject = ['$http']


    // function service($http) {
    //   this.all = all
    //   this.findById = findById
    //   this.create = create
    //   this.update = update
    //   this.upvote = upvote
    //   this.downvote = downvote
    //
    //   function all() {
    //     return $http.get('/api/posts')
    //       .then(response => response.data)
    //   }
    //
    //   function findById(id) {
    //     return $http.get(`/api/posts/${id}`)
    //       .then(response => {
    //         const post = response.data
    //         return $http.get(`/api/posts/${id}/comments`)
    //           .then(response => {
    //             post.comments = response.data
    //             return post
    //           })
    //       })
    //   }
    //
    //   function create(post) {
    //     return $http.post('/api/posts', post)
    //       .then(response => {
    //         response.data.comments = []
    //         return response.data
    //       })
    //   }
    //
    //   function update(id, post) {
    //     return $http.patch(`/api/posts/${id}`, post)
    //       .then(response => {
    //         return response.data
    //       })
    //   }
    //
    //   function upvote(post) {
    //     return $http.post(`/api/posts/${post.id}/votes`)
    //       .then(response => {
    //         return response.data.vote_count
    //       })
    //   }
    //
    //   function downvote(post) {
    //     if (post.vote_count === 0) return Promise.resolve(post.vote_count)
    //     return $http.delete(`/api/posts/${post.id}/votes`)
    //       .then(response => {
    //         return response.data.vote_count
    //       })
    //   }
    //
    // }

    function ShowPostsController($http, moment) {
      const vm = this

      console.log('list controller is working');

      vm.$onInit = function() {
        $http.get('/api/posts').then(res => {
          console.log(res);
          vm.posts = res.data
        })
        // PostService.all().then(res => {
        //   vm.posts = res
        //
        // })

      }

      vm.upVote = function(post) {
        let upVoteUrl = '/api/posts/' + post.id + '/votes'
        $http.post(upVoteUrl, post).then(res => {
          console.log(res);
          $http.get('/api/posts').then(res => {
            console.log(res);
            vm.posts = res.data
          })
        })
        // PostService.upVote().then(res => {
        //   console.log()
        //   vm.post.vote_count = res
        //
        //
        // })

      }

      vm.downVote = function(post) {
        let downVoteUrl = '/api/posts/' + post.id + '/votes'
        if (post.vote_count >= 1) {
          $http.delete(downVoteUrl, post).then(res => {
            console.log(res)
            $http.get('/api/posts').then(res => {
              console.log(res);
              vm.posts = res.data
            })
          })
        }
        // PostService.downVote().then(res => {
        //   vm.post.vote_count = res
        //
        // })

      }
      vm.selected = -1
      vm.setShowComments = function(id) {
        console.log('setting to', id);
        vm.selected = id
      }

      vm.commentsOn = function(id) {
        return vm.selected === id
      }
      vm.addComment = function(id) {
        let commentUrl = '/api/posts/' + id + '/comments'
        console.log(vm.newComment);
        $http.post(commentUrl, vm.newComment).then(res => {
          console.log(res);
          $http.get('/api/posts').then(res => {
            console.log(res);
            vm.posts = res.data
            delete vm.newComment
          })

        })

      }
    }






  }();
