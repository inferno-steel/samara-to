// Слайдер

const slider = document.querySelectorAll(".slider")

const sliderWrap = document.querySelector(".slider-wrap")
const sliderImage = document.querySelectorAll(".slider_img")
const btnRight = document.querySelector(".button-right")
const btnLeft = document.querySelector(".button-left")
const sliderDot = document.querySelectorAll(".slider_dot")
let sliderCounter = 0
let sliderWidth;

window.addEventListener("resize", showSlide)
btnLeft.addEventListener("click", nextSlide)
btnRight.addEventListener("click", prevSlide)

function showSlide() {
	sliderWidth = document.querySelector(".slider").offsetWidth;
	sliderWrap.style.width = sliderWidth * sliderImage.length + "px";
	sliderImage.forEach(item => item.style.width = sliderWidth + "px");
	rollSlider()
}
showSlide()

function prevSlide() {
	sliderCounter++;
	if (sliderCounter >= sliderImage.length) {
		sliderCounter = 0;
	}
	console.log(sliderCounter);
	rollSlider()
	thisSlide(sliderCounter)
}

function nextSlide() {
	sliderCounter--;
	if (sliderCounter < 0) {
		sliderCounter = sliderImage.length -1;
	}
	console.log(sliderCounter);
	rollSlider()
	thisSlide(sliderCounter)
}

function rollSlider() {
	sliderWrap.style.transform = `translateX(${-sliderCounter * sliderWidth}px)`;
}

function thisSlide(index) {
	sliderDot.forEach(item => item.classList.remove('active_dot'));
	sliderDot[index].classList.add('active_dot')
}

sliderDot.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		sliderCounter = index;
		rollSlider();
		thisSlide(sliderCounter);
	})
})


// Скролл меню

const links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
	links[i].onclick = function () {
		document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"})
	}
}


// Скролл "записаться"

document.querySelector(".main-button").addEventListener("click", () => {
	document.querySelector(".record").scrollIntoView({behavior: "smooth"});
})


// Скролл "записаться" в карточках

const categoriesBtn = document.querySelectorAll(".categories-item-button");
for (let i = 0; i < categoriesBtn.length; i++) {
	categoriesBtn[i].onclick = function () {
		document.querySelector(".record").scrollIntoView({behavior: "smooth"});
	}
}


// Бургер меню

document.addEventListener("DOMContentLoaded", function(){
	document.querySelector("#burger-menu").addEventListener('click', function () {
		console.log("click")
		document.querySelector(".header-wrap").classList.toggle("burger-open")
	})
})


// Аккордеон

let questionsBox = document.querySelectorAll(".questions-box")

questionsBox.forEach(function (questionsItem) {
	questionsItem.addEventListener("click", (e) => {
		e.preventDefault();
		let questionsElem = e.target.closest(".questions-box");
		let dropElem = questionsElem.lastElementChild;
		dropElem.classList.toggle("active-box");
		questionsElem.classList.toggle("active");
	})
})


// Валидация формы

let form = document.querySelector('.form-wrap');
let fields = form.querySelectorAll('.field');
let customBtn = document.querySelectorAll(".red")


// Проверка на заполненность инпутов

function checkFieldsPresence () {
	checkCheckbox();
	let res = true;
	console.log("Запускается чекфилдс")
	console.log(fields)
	fields.forEach((fieldElem) => {
		if (fieldElem.value == "") {
			let error = generateError('Поле не заполнено');
			fieldElem.parentElement.appendChild(error);
			fieldElem.classList.add("error-border");
			fieldElem.previousElementSibling.classList.add("error-border");
			res = false;
		}
	})
	return res;
}

// Очистка ошибок

let removeValidation = function () {
	let errors = form.querySelectorAll('.error')
	for (let i = 0; i < errors.length; i++) {
		errors[i].remove();
	}
	console.log(customBtn)
	fields.forEach((i) => {
		i.classList.remove("error-border");
		i.previousElementSibling.classList.remove("error-border");
	})
}


// Создание окна с ошибкой

let generateError = function (text) {
	let error = document.createElement('div')
	error.className = 'error';
	error.innerHTML = text;
	return error;
}


// Проверка чекбокса

function checkCheckbox() {
	let resultCheckbox = true
	const checkbox = document.querySelector(".real-checkbox")
	if (checkbox.checked) {
		document.querySelector(".checkbox-content").classList.remove("erorr-check")
		resultCheckbox = true
	} else {
		document.querySelector(".checkbox-content").classList.add("erorr-check")
		resultCheckbox = false
	}
	return resultCheckbox;
}

// Отправка формы

form.addEventListener('submit',  function (e) {
	e.preventDefault();
	removeValidation();
	if (checkFieldsPresence() == true
		&& checkCheckbox() == true) {
		console.log("Отправка формы")
	} else {
		console.log("Ошибка отправки формы")
		return false;
	}
	console.log("продолжение формы")
	form.reset()
	document.querySelector(".modal-wrap").classList.add("modal-active");
	document.querySelector(".modal-close-button").addEventListener("click", function(){
		document.querySelector(".modal-wrap").classList.remove("modal-active")
	})
	document.addEventListener('click', function (e) {
		if (e.target == document.querySelector(".modal-wrap")){
			document.querySelector(".modal-wrap").classList.remove("modal-active")
		}
	})
})


// Выпадающие списки формы

document.querySelectorAll('.form-box').forEach(function (dropDownBox){

	const dropdownBtn = dropDownBox.querySelector(".dropdown_button");
	const dropdownList = dropDownBox.querySelector(".dropdown__list");
	const dropdonwListItem = dropdownList.querySelectorAll('.dropdown__list-item');
	const dropDownInput = dropDownBox.querySelector(".dropdown__input-hidden");


	// Клик по кнопке. Открытие и закрытие select

	dropdownBtn.addEventListener('click', function () {
		dropdownList.classList.toggle("dropdown__list-visible");
	});


	// Выбор элемента списка

	dropdonwListItem.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {
			e.stopPropagation();
			dropdownBtn.innerText = this.innerText
			dropdownBtn.focus()
			dropdownList.classList.remove("dropdown__list-visible")
			dropDownInput.value = this.dataset.value
		})
	})


	// Закрытие по клику вне select

	document.addEventListener('click', function (e) {
		if (e.target !== dropdownBtn){
			dropdownList.classList.remove("dropdown__list-visible")
		}
	})


	// Закрытие по нажатию на "Tab" || "Escape"

	document.addEventListener('keydown', function(e){
		if(e.key === 'Tab' || e.key === 'Escape') {
			dropdownList.classList.remove("dropdown__list-visible");
		}
	})
})


// Маска ввода номера телефона (плагин maskedinput)

// $(function($){
// 	$('[name="phone_number"]').mask("+7(999) 999-9999");
// }