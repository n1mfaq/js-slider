;(function init(time) {
	let container = document.querySelector('#carousel')
	let controlsContainer = document.querySelector('.controls')
	let indicatorsContainer = document.querySelector('.indicators')
	let indicator = document.querySelectorAll('.indicator')
	let slides = document.querySelectorAll('.slide')
	let pausePlayBtn = document.querySelector('#pause')
	let nextBtn = document.querySelector('#next')
	let prevBtn = document.querySelector('#previous')

	let interval = time
	let currentSlide = 0
	let timerId = null
	let isPlaying = true
	let slideLength = slides.length
	let swipeStartX = null
	let swipeEndX = null

	const LEFT_ARROW = 'ArrowLeft'
	const RIGHT_ARROW = 'ArrowRight'
	const SPACE = ' '
	const FA_PAUSE = 'Pause'
	const FA_PlAY = 'Play'

	function gotoNth(n) {
		slides[currentSlide].classList.toggle('active')
		indicator[currentSlide].classList.toggle('active')
		currentSlide = (n + slideLength) % slideLength
		slides[currentSlide].classList.toggle('active')
		indicator[currentSlide].classList.toggle('active')
	}

	function gotoNext() {
		gotoNth(currentSlide + 1)
	}

	function gotoPrev() {
		gotoNth(currentSlide - 1)
	}

	function play() {
		timerId = setInterval(gotoNext, interval)
		pausePlayBtn.innerHTML = 'Pause'
		isPlaying = !isPlaying
	}

	function pause() {
		if (isPlaying) {
			clearInterval(timerId)
			pausePlayBtn.innerHTML = 'Play'
			isPlaying = !isPlaying
		}
	}

	function pausePlay() {
		if (isPlaying) pause()
		else play()
	}

	function next() {
		pause()
		gotoNext()
	}

	function prev() {
		pause()
		gotoPrev()
	}

	function indicate(e) {
		let target = e.target
		if (target.classList.contains('indicator')) {
			pause()
			gotoNth(+target.getAttribute('data-slide-to'))
		}
	}

	function pressKey(e) {
		switch (e.key) {
			case LEFT_ARROW:
				prev()
				break
			case RIGHT_ARROW:
				next()
				break
			case SPACE:
				pausePlay()
				break
		}
	}

	function swipeStart(e) {
		swipeStartX = e.changedTouches[0].pageX
	}

	function swipeEnd(e) {
		swipeEndX = e.changedTouches[0].pageX

		swipeStartX - swipeEndX < -100 && prev()
		swipeStartX - swipeEndX > 100 && next()
	}

	function setListeners() {
		pausePlayBtn.addEventListener('click', pausePlay)
		nextBtn.addEventListener('click', next)
		prevBtn.addEventListener('click', prev)
		indicatorsContainer.addEventListener('click', indicate)
		document.addEventListener('keydown', pressKey)
		container.addEventListener('touchstart', swipeStart)
		container.addEventListener('touchend', swipeEnd)
	}

	function init() {
		controlsContainer.style.display = 'block'
		indicatorsContainer.style.display = 'block'

		setListeners()

		timerId = setInterval(gotoNext, interval)
	}

	init()
})()
