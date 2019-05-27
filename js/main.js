var header = document.querySelector('header');
var body = document.body;

window.addEventListener('scroll', function() {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if( scrollTop > 0 ) {
		header.classList.add('show-bg');
	} else {
		header.classList.remove('show-bg');
	}
});

body.addEventListener('keyup', function(e) {
	if(e.keyCode == 27) {
		closePreview();
	}
})

var groundWrapper = document.querySelector('#hero .ground-wrapper');
var wrapperWidth = groundWrapper.clientWidth;
var heroTL = new TimelineMax({
	repeat: -1
});

// loop animation
function loop(el, duration) {
	TweenMax
		.to(el, duration, {
			ease: Linear.easeNone,
			x: '-=' + wrapperWidth,
			modifiers: {
				y: function(x) {
					return x % wrapperWidth;
				}
			},
			repeat: -1
		})
}

loop('#hero .ground', 2);
loop('#hero .clouds', 20);

// man
TweenLite.set('#hero .man', {
	transformOrigin: 'bottom'
})

heroTL
	.to('#hero .man', .3, {
		delay: .3,
		y: 1
	})
	.to('#hero .man', .3, {
		y: 0
	})
	.to('#hero .man', .3, {
		y: 1
	})
	.to('#hero .man', .3, {
		y: 0
	})
	.to('#hero .man', 1, {
		delay: .5,
		x: '15%'
	})
	.to('#hero .man', 2, {
		delay: .5,
		x: '0%'
	})
