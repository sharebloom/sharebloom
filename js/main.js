// utils
function toArray(nodelist) {
	return [].slice.call(nodelist);
}

///////////////////////

var header = document.querySelector('header');
var burgerMenu = document.querySelector('.burger-menu');
var body = document.body;

// header
function headerInteraction() {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if( scrollTop > 0 ) {
		header.classList.add('show-bg');
	} else {
		header.classList.remove('show-bg');
	}
}

headerInteraction();

window.addEventListener('scroll', function() {
	headerInteraction();
});

// burger menu
burgerMenu.addEventListener('click', function() {
	header.classList.toggle('show-mobile-menu');
});

body.addEventListener('keyup', function(e) {
	if(e.keyCode == 27) {

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

// scroll animations
function animFly(items, options) {
	if(options.state == 'forward') {

		TweenMax.staggerFrom(items, options.duration, {
			delay: options.delay,
			y: options.y,
			ease: Power4.easeOut
		}, options.repeatDelay)
		TweenMax.staggerTo(items, options.duration, {
			delay: options.delay,
			opacity: 1
		}, options.repeatDelay)

	} else {

		TweenMax.staggerTo(items, options.duration, {
			opacity: 0,
			y: options.y * -1
		}, options.repeatDelay)

	}
}

// stagger animation
var staggerAnims = document.querySelectorAll('.stagger-animation');
var yAnim = 15;
if(staggerAnims) {

	staggerAnims = toArray(staggerAnims);
	staggerAnims.forEach(function(anim) {
		var animItems = anim.querySelectorAll('.anim-item');
		animItems = toArray(animItems);

		var animWatcher = scrollMonitor.create(anim, -250);
		var animScroll = anim.getAttribute('data-scroll');
		var animState = false;

		if(animScroll == 'false') {

			animFly(animItems, {
				state: 'forward',
				duration: .85,
				delay: .3,
				y: yAnim,
				repeatDelay: .2
			})
			animState = true;

		} else {

			animWatcher.enterViewport(function() {
				if(!animState) {
					animFly(animItems, {
						state: 'forward',
						duration: .85,
						delay: 0,
						y: yAnim,
						repeatDelay: .2
					})
					animState = true;
				}
			})

		}

		animWatcher.exitViewport(function() {
			console.log('exit');
		})
	});

}
