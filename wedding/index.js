new Vue({
	el: '#wrap',
	data: {
		timer: null,
		maxStep: 4,
		step: 1
	},
	methods: {
		nextPage: function() {
			if (this.timer) return;
			if (this.step < this.maxStep) {
				this.step++;
				var that = this;
				this.timer = setTimeout(function() {
					that.timer = null;
				}, 500)
			}
		},
		prePage: function() {
			if (this.timer) return;
			if (this.step > 1) {
				this.step--;
				var that = this;
				this.timer = setTimeout(function() {
					that.timer = null;
				}, 500)
			}
		}
	},
	mounted: function() {
		var that = this;
		var startPosition, endPosition, deltaY;
		var el = document;

		el.addEventListener('touchstart', function(e) {
			that.$refs.player.play();// 触发播放器
			var touch = e.touches[0];
			startPosition = {
				y: touch.pageY
			}
		});

		el.addEventListener('touchmove', function(e) {
			var touch = e.touches[0];
			endPosition = {
				y: touch.pageY
			}

			deltaY = endPosition.y - startPosition.y;
		});

		el.addEventListener('touchend', function(e) {
			if (deltaY > 50) {
				that.prePage();
				return;
			}

			if (deltaY < -50) {
				that.nextPage();
				return;
			}
		});
	}
})