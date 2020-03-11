var app = new Vue({
	el: "#player",
	data: {
		query: "",
		musicList: [],
		musicUrl: "",
		imgUrl: "",
		hotComments: [],
		isPlaying: false,
		//遮罩层显示状态
		isShow:false,
		//mv地址
		mvURL:""
	},
	methods: {
		searchMusic: function() {
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords="+that.query)
				.then(function(response) {
					that.musicList = [];
					that.musicList = response.data.result.songs;
				},function(err){});
		},
		// 点击播放按钮播放音乐
		playMusic: function(musicId) {
			var that = this;
			//获取歌曲地址
			axios.get("https://autumnfish.cn/song/url?id=" + musicId)
				.then(function(response) {
					that.musicUrl = response.data.data[0].url;
				}, function(err) {})

			//获取歌曲专辑图片
			axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
				function(response) {
					that.imgUrl = response.data.songs[0].al.picUrl;
				},
				function(err) {})

			//获取歌曲评论
			axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).
			then(function(response) {
				that.hotComments = response.data.hotComments;
			}, function(err) {})
		},
		//播放器开始事件
		play: function() {
			this.isPlaying = true;
		},
		pause: function() {
			this.isPlaying = false;
		},
		playMv: function(mvid) {
			var that = this;
			axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
			function(response) {
				that.isShow=true;
				that.mvURL = response.data.data.url;
			}, function(err) {})
		},
		hide:function(){
			this.isShow = false;
			this.mvURL="";
		}
	}
})
