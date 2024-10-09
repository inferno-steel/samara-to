




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

let inputAll = form.querySelectorAll("input")


function validation(form){
    checkCheckbox()

    let result = true;

    inputAll.forEach(function(input){
        clearForm(input)
        if (input.value == "") {
            input.classList.add("erorr")
            input.previousElementSibling.classList.add("erorr")
            createElement(input)
            result = false;
        }})
    return result;
}




// Добавление строки с ошибкой

function createElement (input) {
    const errorLabel = document.createElement('div')
    errorLabel.classList.add("erorr-label")
    errorLabel.textContent = "Поле не заполнено";
    // input.insertAdjacentElement('afterEnd', errorLabel);
    // input.before(errorLabel);
    let formBox = input.parentElement;
    formBox.after(errorLabel);
    console.log(formBox);
}


// Очистка ошибок

function clearForm(input){
    if (input.classList.contains("erorr")) {
        input.classList.remove("erorr")
        document.querySelector(".erorr-label").remove()
        input.previousElementSibling.classList.remove("erorr")
    }

    // if (input.previousElementSibling.classList.contains("erorr")) {
    // 	input.previousElementSibling.classList.remove("erorr")
    // }
}


// Ошибка чекбокса

function checkCheckbox() {
    let resultCheck = true
    const checkbox = document.querySelector(".real-checkbox")
    if (checkbox.checked) {
        console.log("Checkbox cheked");
        document.querySelector(".checkbox-content").classList.remove("erorr-check")
        resultCheck = true
    } else {
        document.querySelector(".checkbox-content").classList.add("erorr-check")
        resultCheck = false
    }
    return resultCheck
}





// Очистка инпутов

function resetForm(form) {
    inputAll.forEach(function(input) {
        input.value = "";
        document.querySelector(".custom-checkbox").checked = false;
        document.querySelector(".real-checkbox").checked = false;
    })
}




//Отправка формы

document.querySelector('#form').addEventListener('submit', async function (event) {
    event.preventDefault()
    if (validation(this) == true &&
        checkCheckbox() == true) {
    } else {
        return false
    }
    document.querySelector(".modal-wrap").classList.add("modal-active")
    let data = {
        select_one: document.querySelector("#select_one").value,
        select_two: document.querySelector("#select_two").value,
        sign: document.querySelector("#number").value,
        phone_number: document.querySelector("#phone_number").value,
        date: document.querySelector("#airdatepicker").value
    }

    let response = await fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    let result = await response.text()
    resetForm(this)
    document.querySelector(".modal-close-button").addEventListener("click", function(){
        document.querySelector(".modal-wrap").classList.remove("modal-active")
    })
    document.addEventListener('click', function (e) {
        if (e.target == document.querySelector(".modal-wrap")){
            document.querySelector(".modal-wrap").classList.remove("modal-active")
        }
    })
})




// Вопросы ответы

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

// Маска ввода номера телефона (плагин maskedinput)

$(function($){
    $('[name="phone_number"]').mask("+7(999) 999-9999");
});




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


