
const popapLinkcs = document.querySelectorAll('.popup-linck');
const body = document.querySelector('body');
const lockPading = document.querySelector(".lock-pading");
const nav = document.querySelector('.navbar');
const fillBlocks = document.querySelectorAll('.fill-block');

isMobile = {

   Android: function() {
      return navigator.userAgent.match(/Android/i);
   },

   BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
   },
     iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  	},
     Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function() {
      return (
      	isMobile.Android() || 
      	isMobile.BlackBerry() || 
      	isMobile.iOS() || 
      	isMobile.Opera() || 
      	isMobile.Windows()
      );
   }
};
console.log('hi');
if (isMobile.any()) {
	document.body.classList.add('touch');
}else{
	document.body.classList.add('pc');
}

let unlock = true;

const timeout = 800;

if (popapLinkcs.length > 0) {
	for (let i = 0; i < popapLinkcs.length; i++) {
		let popapLinck = popapLinkcs[i];
		popapLinck.addEventListener("click", function(e) {
			let popapName = popapLinck.getAttribute('href').replace('#', '');
			let curentPopap = document.getElementById(popapName);
			popapOpen(curentPopap);
			e.preventDefault();
		});
	}
}

const popapCloseIcon = document.querySelectorAll('.cloce-popap');

if (popapCloseIcon.length > 0) {
	for (let i = 0; i < popapCloseIcon.length; i++) {
		let el = popapCloseIcon[i];
		el.addEventListener('click', function(e) {
			popapClose(el.closest('.popap'));
			e.preventDefault();
		});
	}
}

const plan = document.querySelector('.plan');

function popapOpen(curentPopap) {
	if (curentPopap && unlock) {
		let popapActive = document.querySelector('.popap.open');
		
		if (popapActive) {
			popapClose(popapActive, false);
		}else {
			bodyLock();
		}
		if (!isMobile.any()) {
			for (let i = 0; fillBlocks.length > i; i++) {
				let fillBlock = fillBlocks[i];
				fillBlock.classList.add('fill');
			}
		}
		curentPopap.classList.add('open');
		nav.classList.add('up-nav');
		curentPopap.addEventListener("click", function(e) {
			
			if (!e.target.closest('.popap-content')) {
				popapClose(e.target.closest('.popap'));
			}
		});
	}
}

function popapClose (popapActive, doUnlock = true) {
	if (unlock) {
		popapActive.classList.remove('open');
		nav.classList.remove('up-nav');
		
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPadingValue = window.innerWidth - document.querySelector('.wrapper-sundry').offsetWidth + 'px';
	console.log(lockPadingValue);
	if (lockPading) {
		for (let i = 0; i < lockPading.length; i++) {
			let el = lockPading[i];
			el.style.padingRight = lockPadingValue;
		}
	}
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (lockPading) {
			for (let i = 0; i < lockPading.length; i++) {
				let el = lockPading[i];
				el.style.padingRight = '0px';
			}
			if (!isMobile.any()) {
				for (let i = 0; fillBlocks.length > i; i++) {
					let fillBlock = fillBlocks[i];
					fillBlock.classList.remove('fill');
				}
			}
		}
		body.style.padingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popapActive = document.querySelector('.popap.open');
		popapClose(popapActive);
	}
});