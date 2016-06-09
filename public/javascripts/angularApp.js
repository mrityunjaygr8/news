var app=angular.module('flapperNews', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider,$urlRouterProvider){
		$stateProvider.state('home',{
			url:'/home',
			templateUrl:'/home.html',
			controller:'MainCtrl'
		});

		$stateProvider.state('posts',{
			url:'/posts/{id}',
			templateUrl:'/posts.html',
			controller:'PostsCtrl'
		});

	$urlRouterProvider.otherwise('home');
	}]);


app.factory('posts', [function () {
	var o={
		posts:[
			{title:'post1',upvotes:5,comments:[]},
			{title:'post2',upvotes:2,comments:[]},
			{title:'post3',upvotes:15,comments:[]},
			{title:'post4',upvotes:21,comments:[]}
		]
	};
	return o;
}]);

app.controller('PostsCtrl', ['$scope','posts','$stateParams', function ($scope,posts,$stateParams) {
	$scope.post=posts.posts[$stateParams.id];

	$scope.showP=function(){
		console.log(posts.posts);
	};

	$scope.addComment=function(){
		if ($scope.body==='') {	return ;}
		$scope.post.comments.push({
			body:$scope.body,
			author:'user',
			upvotes:0
		});
		$scope.body='';
	};
}]);

app.controller('MainCtrl', ['$scope','posts', function ($scope,posts) {
	$scope.posts=posts.posts;
	$scope.addPost=function(){
		if(!$scope.title || $scope.title===''){return;}
		$scope.posts.push({
			title:$scope.title,
			upvotes:0,
			link:$scope.link,
			comments:[
				{author:'Joe',body:'cool poost',upvotes:0},
				{author:'Bob',body:'whoa',upvotes:0}
			]
		});
		$scope.title='';
		$scope.link='';
	};

	$scope.showP=function(){
		console.log($scope.posts);
	};

	$scope.increaseUpvotes=function(post){
		post.upvotes+=1;
	};
}]);