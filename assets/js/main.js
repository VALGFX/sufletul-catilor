/* === Sufletul Cărților — main.js === */

// ---- Data ----
const libraryItems = [
	{ type: ['c_universale'], image: '/assets/images/entertainment/photo1.jpeg' },
	{ type: ['f_universale'], image: '/assets/images/entertainment/photo2.jpg' },
	{
		type: ['s_universale', 'c_universale'],
		image: '/assets/images/entertainment/photo3.png',
	},
	{ type: ['c_universale'], image: '/assets/images/entertainment/photo4.webp' },
	{ type: ['f_universale'], image: '/assets/images/entertainment/photo5.jpeg' },
	{ type: ['c_universale'], image: '/assets/images/entertainment/photo6.jpg' },
	{ type: ['c_universale'], image: '/assets/images/entertainment/photo7.webp' },
	{ type: ['s_universale'], image: '/assets/images/entertainment/photo8.jpg' },
	{ type: ['c_universale'], image: '/assets/images/entertainment/photo9.webp' },
	{ type: ['f_universale'], image: '/assets/images/entertainment/photo10.jpg' },
	{ type: ['c_universale'], image: '/assets/images/entertainment/photo11.jpg' },
	{ type: ['c_romane'], image: '/assets/images/entertainment/photo12.jpg' },
	{ type: ['c_romane'], image: '/assets/images/entertainment/photo13.png' },
	{ type: ['c_romane'], image: '/assets/images/entertainment/photo14.jpeg' },
	{ type: ['c_romane'], image: '/assets/images/entertainment/photo15.jpeg' },
	{ type: ['c_romane'], image: '/assets/images/entertainment/photo16.jpg' },
	{ type: ['c_romane'], image: '/assets/images/entertainment/photo17.jpeg' },
	{ type: ['c_romane'], image: '/assets/images/entertainment/photo18.jpg' },
	{ type: ['f_romane'], image: '/assets/images/entertainment/photo19.webp' },
	{ type: ['f_romane'], image: '/assets/images/entertainment/photo20.jpg' },
	{ type: ['f_romane'], image: '/assets/images/entertainment/photo21.jpg' },
	{ type: ['f_romane'], image: '/assets/images/entertainment/photo22.jpg' },
	{ type: ['f_romane'], image: '/assets/images/entertainment/photo23.jpg' },
]

const categoryMap = {
	carti: ['c_romane', 'c_universale', 'c_universal'],
	filme: ['f_romane', 'f_universale'],
	seriale: ['s_romane', 's_universale'],
}

const bookQuotes = [
	'"O carte bună este cea mai bună prietenă."',
	'"Cărțile sunt oglinzile sufletului."',
	'"Citind, trăim o mie de vieți."',
	'"Există cărți de care nu poți uita."',
	'"Fiecare pagină e o nouă lume."',
]

const tickerQuotes = [
	'"O carte bună este cea mai bună prietenă." — Alexandre Dumas',
	'"Cărțile sunt oglinzile sufletului." — Virginia Woolf',
	'"Citind, trăim o mie de vieți." — George R.R. Martin',
	'"Există cărți de care nu poți uita, oricât ai încerca." — Oscar Wilde',
	'"Fiecare carte este o lume în sine." — C.S. Lewis',
	'"Lectura este visarea cu ochii deschiși." — Anatole France',
]

// ---- Progress bar ----
const progressBar = document.getElementById('progress-bar')
window.addEventListener(
	'scroll',
	() => {
		const st = document.documentElement.scrollTop
		const sh =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight
		progressBar.style.width = (st / sh) * 100 + '%'
	},
	{ passive: true },
)

// ---- Sticky nav ----
const nav = document.getElementById('nav')
window.addEventListener(
	'scroll',
	() => {
		nav.classList.toggle('scrolled', window.scrollY > 20)
	},
	{ passive: true },
)

// ---- Active nav link on scroll ----
const navAnchors = document.querySelectorAll('.nav-links a[data-section]')
const pageSections = document.querySelectorAll('section[id]')

const sectionObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				navAnchors.forEach(a =>
					a.classList.toggle('active', a.dataset.section === entry.target.id),
				)
			}
		})
	},
	{ threshold: 0.35 },
)

pageSections.forEach(s => sectionObserver.observe(s))

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger')
const navLinksEl = document.getElementById('nav-links')
const overlay = document.getElementById('mobile-overlay')

function openMenu() {
	hamburger.classList.add('open')
	navLinksEl.classList.add('open')
	overlay.classList.add('open')
	document.body.style.overflow = 'hidden'
}
function closeMenu() {
	hamburger.classList.remove('open')
	navLinksEl.classList.remove('open')
	overlay.classList.remove('open')
	document.body.style.overflow = ''
}
function toggleMenu() {
	navLinksEl.classList.contains('open') ? closeMenu() : openMenu()
}

hamburger.addEventListener('click', toggleMenu)
overlay.addEventListener('click', closeMenu)
navLinksEl
	.querySelectorAll('a')
	.forEach(a => a.addEventListener('click', closeMenu))

// ---- Reveal on scroll ----
const revealObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible')
			}
		})
	},
	{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
)

document
	.querySelectorAll('.reveal, .reveal-item')
	.forEach(el => revealObserver.observe(el))

// ---- Stat counters ----
function animateCounter(el) {
	const target = +el.dataset.target
	const start = performance.now()
	const dur = 1500
	const tick = now => {
		const p = Math.min((now - start) / dur, 1)
		const eased = 1 - Math.pow(1 - p, 3)
		el.textContent = Math.round(eased * target)
		if (p < 1) requestAnimationFrame(tick)
	}
	requestAnimationFrame(tick)
}

const statsGrid = document.getElementById('stats-grid')
if (statsGrid) {
	new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				statsGrid.querySelectorAll('.stat-number').forEach(animateCounter)
			}
		},
		{ threshold: 0.5 },
	).observe(statsGrid)
}

// ---- Quotes ticker ----
const quotesTrack = document.getElementById('quotes-track')
if (quotesTrack) {
	const doubled = [...tickerQuotes, ...tickerQuotes]
	doubled.forEach(q => {
		const chip = document.createElement('div')
		chip.className = 'quote-chip'
		chip.innerHTML = `<div class="quote-dot"></div><span>${q}</span>`
		quotesTrack.appendChild(chip)
	})
}

// ---- Rotating hero quote ----
const heroQuoteEl = document.getElementById('hero-quote-text')
if (heroQuoteEl) {
	let qi = 0
	heroQuoteEl.style.transition = 'opacity 0.45s ease'
	setInterval(() => {
		heroQuoteEl.style.opacity = '0'
		setTimeout(() => {
			qi = (qi + 1) % bookQuotes.length
			heroQuoteEl.textContent = bookQuotes[qi]
			heroQuoteEl.style.opacity = '1'
		}, 460)
	}, 5000)
}

// ---- Library filter & render ----
const libraryGrid = document.getElementById('library-grid')

function shuffle(arr) {
	return [...arr].sort(() => Math.random() - 0.5)
}

function renderLibrary(filter) {
	if (!libraryGrid) return
	const filtered =
		filter === 'toate'
			? libraryItems
			: libraryItems.filter(item => {
					const cats = categoryMap[filter]
					return cats
						? item.type.some(t => cats.includes(t))
						: item.type.includes(filter)
				})

	libraryGrid.innerHTML = ''
	shuffle(filtered).forEach((item, i) => {
		const card = document.createElement('div')
		card.className = 'lib-card'
		card.style.animationDelay = `${i * 35}ms`
		const img = document.createElement('img')
		img.src = item.image
		img.alt = item.type.join(', ')
		img.loading = 'lazy'
		card.appendChild(img)
		libraryGrid.appendChild(card)
	})
}

document.querySelectorAll('.filter-btn, .filter-sub').forEach(btn => {
	btn.addEventListener('click', e => {
		e.stopPropagation()
		document
			.querySelectorAll('.filter-btn')
			.forEach(b => b.classList.remove('active'))
		btn.classList.add('active')
		renderLibrary(btn.dataset.filter)
	})
})

// ---- Gallery lightbox ----
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'))
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
const lightboxLabel = document.getElementById('lightbox-label')
let currentIdx = 0

function openLightbox(idx) {
	currentIdx = idx
	const item = galleryItems[idx]
	lightboxImg.src = item.querySelector('img').src
	lightboxLabel.textContent = item.dataset.label || ''
	lightbox.classList.add('open')
	document.body.style.overflow = 'hidden'
}

function closeLightbox() {
	lightbox.classList.remove('open')
	document.body.style.overflow = ''
}

galleryItems.forEach((item, i) =>
	item.addEventListener('click', () => openLightbox(i)),
)
document
	.getElementById('lightbox-close')
	.addEventListener('click', closeLightbox)
lightbox.addEventListener('click', e => {
	if (e.target === lightbox) closeLightbox()
})

document.getElementById('lightbox-prev').addEventListener('click', e => {
	e.stopPropagation()
	openLightbox((currentIdx - 1 + galleryItems.length) % galleryItems.length)
})
document.getElementById('lightbox-next').addEventListener('click', e => {
	e.stopPropagation()
	openLightbox((currentIdx + 1) % galleryItems.length)
})

document.addEventListener('keydown', e => {
	if (!lightbox.classList.contains('open')) return
	if (e.key === 'Escape') closeLightbox()
	if (e.key === 'ArrowLeft')
		openLightbox((currentIdx - 1 + galleryItems.length) % galleryItems.length)
	if (e.key === 'ArrowRight')
		openLightbox((currentIdx + 1) % galleryItems.length)
})

// Swipe support for lightbox on mobile
let touchStartX = 0
lightbox.addEventListener(
	'touchstart',
	e => {
		touchStartX = e.changedTouches[0].screenX
	},
	{ passive: true },
)
lightbox.addEventListener('touchend', e => {
	const dx = e.changedTouches[0].screenX - touchStartX
	if (Math.abs(dx) < 40) return
	dx < 0
		? openLightbox((currentIdx + 1) % galleryItems.length)
		: openLightbox((currentIdx - 1 + galleryItems.length) % galleryItems.length)
})

// ---- Back to top ----
const backToTop = document.getElementById('back-to-top')
window.addEventListener(
	'scroll',
	() => {
		backToTop.classList.toggle('visible', window.scrollY > 400)
	},
	{ passive: true },
)
backToTop.addEventListener('click', () =>
	window.scrollTo({ top: 0, behavior: 'smooth' }),
)

// ---- Parallax hero bg ----
const heroBg = document.querySelector('.hero-bg')
window.addEventListener(
	'scroll',
	() => {
		if (heroBg && window.scrollY < window.innerHeight) {
			heroBg.style.transform = `translateY(${window.scrollY * 0.18}px)`
		}
	},
	{ passive: true },
)

// ---- Init ----
renderLibrary('toate')
