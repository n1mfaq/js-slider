function Carousel() {
	this.container = document.querySelector('#carousel')
	this.controlsContainer = document.querySelector('.controls')
	this.indicatorsContainer = document.querySelector('.indicators')
	this.indicator = document.querySelectorAll('.indicator')
	this.slides = document.querySelectorAll('.slide')
	this.pausePlayBtn = document.querySelector('#pause')
	this.nextBtn = document.querySelector('#next')
	this.prevBtn = document.querySelector('#previous')

	this.interval = 2000
	this.currentSlide = 0
	this.timerId = null
	this.isPlaying = true
	this.slideLength = this.slides.length
	this.swipeStartX = null
	this.swipeEndX = null

	this.LEFT_ARROW = 'ArrowLeft'
	this.RIGHT_ARROW = 'ArrowRight'
	this.SPACE = ' '
	this.FA_PAUSE = 'Pause'
	this.FA_PlAY = 'Play'
}

Carousel.prototype.gotoNth = function (n) {
	this.slides[this.currentSlide].classList.toggle('active')
	this.indicator[this.currentSlide].classList.toggle('active')
	this.currentSlide = (n + this.slideLength) % this.slideLength
	this.slides[this.currentSlide].classList.toggle('active')
	this.indicator[this.currentSlide].classList.toggle('active')
}

Carousel.prototype.gotoNext = function () {
	this.gotoNth(this.currentSlide + 1)
}

Carousel.prototype.gotoPrev = function () {
	this.gotoNth(this.currentSlide - 1)
}

Carousel.prototype.play = function () {
	this.timerId = setInterval(this.gotoNext, this.interval)
	this.pausePlayBtn.innerHTML = this.FA_PAUSE
	this.isPlaying = !this.isPlaying
}

Carousel.prototype.pause = function () {
	if (this.isPlaying) {
		clearInterval(this.timerId)
		this.pausePlayBtn.innerHTML = this.FA_PlAY
		this.isPlaying = !this.isPlaying
	}
}

Carousel.prototype.pausePlay = function () {
	if (this.isPlaying) this.pause()
	else this.play()
}

Carousel.prototype.next = function () {
	this.pause()
	this.gotoNext()
}

Carousel.prototype.prev = function () {
	this.pause()
	this.gotoPrev()
}

Carousel.prototype.indicate = function (e) {
	let target = e.target
	if (target.classList.contains('indicator')) {
		this.pause()
		this.gotoNth(+target.getAttribute('data-slide-to'))
	}
}

Carousel.prototype.pressKey = function (e) {
	switch (e.key) {
		case this.LEFT_ARROW:
			this.prev()
			break
		case this.RIGHT_ARROW:
			this.next()
			break
		case this.SPACE:
			this.pausePlay()
			break
	}
}

Carousel.prototype.swipeStart = function (e) {
	this.swipeStartX = e.changedTouches[0].pageX
}

Carousel.prototype.swipeEnd = function (e) {
	this.swipeEndX = e.changedTouches[0].pageX

	this.swipeStartX - this.swipeEndX < -100 && this.prev()
	this.swipeStartX - this.swipeEndX > 100 && this.next()
}

Carousel.prototype.setListeners = function () {
	this.pausePlayBtn.addEventListener('click', this.pausePlay.bind(this))
	this.nextBtn.addEventListener('click', this.next.bind(this))
	this.prevBtn.addEventListener('click', this.prev.bind(this))
	this.indicatorsContainer.addEventListener('click', this.indicate.bind(this))
	document.addEventListener('keydown', this.pressKey.bind(this))
	this.container.addEventListener('touchstart', this.swipeStart.bind(this))
	this.container.addEventListener('touchend', this.swipeEnd.bind(this))
}

Carousel.prototype.init = function () {
	this.controlsContainer.style.display = 'block'
	this.indicatorsContainer.style.display = 'block'
	this.setListeners()
	this.timerId = setInterval(() => {
		this.gotoNext()
	}, this.interval)
}

let carousel = new Carousel()
carousel.init()
