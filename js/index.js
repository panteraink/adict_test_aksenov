"use strict";

//Активация кнопки открытия меню
const navigationButtonActivation = () => {
    const navOpenButton = document.querySelector('.navigation__menu-icon');
    const nav = document.querySelector('.navigation__buttons');
    const navOpen = () => {
        if (nav) {nav.classList.toggle('navigation_opened');}
    };
    if (navOpenButton) {navOpenButton.addEventListener('click', navOpen);}
};

//Активайия первого слайда для разрешений ниже 768px
const firstSlideOnly = () => {
    const sliders = document.querySelectorAll('.slider_container');
    if (sliders) {
        for (const sliderContainer of sliders) {
            const slides = sliderContainer.querySelectorAll('.slide');
            if (slides) {
                const buttonPrevious = sliderContainer.querySelector('.slider-button-previous');
                if (buttonPrevious) {
                    const buttonNext = sliderContainer.querySelector('.slider-button-next');
                    if (buttonNext) {
                        for (const i of slides) {i.classList.add('slide_next');}
                        slides[0].classList.remove('slide_next');
                        slides[0].classList.add('slide_active');
                        buttonPrevious.classList.add('slider-button-deactivate');
                        buttonNext.classList.add('slider-button-deactivate');
                    };
                };
            };
        };
    };
};
//Активация слайдеров
const sliderActivation = () => {
    
    //Находим контейнер со слайдером и кнопками
    const sliders = document.querySelectorAll('.slider_container');

    if (sliders) {
        for (const sliderContainer of sliders) {
            //Индекс текущего слайда
            let currentSlide = 0;
            //Направление движения слайдера по таймеру
            let slideDirection = 'next';
            const slides = sliderContainer.querySelectorAll('.slide');
            //Проверяем есть ли у нас больше одного слайда
            if (slides.length > 1) {
                const buttonPrevious = sliderContainer.querySelector('.slider-button-previous');
                //Проверяем есть ли у нас кнопки
                if  (buttonPrevious) {
                    const buttonNext = sliderContainer.querySelector('.slider-button-next');
                    if (buttonNext) {
                        //Счетчик слайдов для таймера
                        let slideCount = slides.length;
                        //Функция которая всем слайдам дает класс Следующий слайд, первому дает Активный слайд, отключает кнопку Назад
                        const sliderClear = () => {
                            for (const i of slides) {i.classList.add('slide_next');}
                            slides[0].classList.remove('slide_next');
                            slides[0].classList.add('slide_active');
                            buttonPrevious.classList.add('slider-button-deactivate');
                        };
                        sliderClear();

                        //Переключение на следующий слайд
                        const slideNext = () => {
                            --slideCount;
                            slides[currentSlide].classList.remove('slide_active');
                            slides[currentSlide].classList.add('slide_previous');
                            slides[currentSlide + 1].classList.remove('slide_next');
                            slides[currentSlide + 1].classList.add('slide_active');
                            buttonPrevious.classList.remove('slider-button-deactivate');
                            ++currentSlide;
                            if (slides[currentSlide + 1]){
                                buttonNext.classList.remove('slider-button-deactivate');
                            } else if (!slides[currentSlide + 1]) {
                                buttonNext.classList.add('slider-button-deactivate');
                            };
                        };
                        //Функция предыдущий слайд
                        const slidePrevious = () => {
                            ++slideCount;
                            slides[currentSlide].classList.remove('slide_active');
                            slides[currentSlide].classList.add('slide_next');
                            slides[currentSlide - 1].classList.remove('slide_previous');
                            slides[currentSlide - 1].classList.toggle('slide_active');
                            buttonNext.classList.remove('slider-button-deactivate');
                            --currentSlide;
                            if (slides[currentSlide - 1]){
                                buttonPrevious.classList.remove('slider-button-deactivate');
                            } else if (!slides[currentSlide - 1]) {
                                buttonPrevious.classList.add('slider-button-deactivate');
                            };
                        };

                        //Функция таймера, переключает слайды с начала в конец и обратно
                        const sliderTimer = () => {
                            if (slideDirection == 'next') {
                                if (slideCount > 1){
                                    slideNext();
                                } else if (slideCount == 1){
                                    slideDirection = 'back';
                                    slidePrevious();
                                };
                            } else if (slideDirection == 'back') {
                                if (slideCount < slides.length){
                                    slidePrevious();
                                }else if (slideCount == slides.length){
                                    slideDirection = 'next';
                                    slideNext();
                                };
                            };
                        };
                        //Вешаем слушателей на кнопки в контейнере
                        buttonNext.addEventListener('click', slideNext);
                        buttonPrevious.addEventListener('click', slidePrevious);
                        setInterval(sliderTimer, 5000);
                    };
                };
            };
        };
    };
};

//Проверяем что viewport меньше или равен 768px
const mediaQuery = window.matchMedia('(max-width: 768px)')
if (mediaQuery.matches) {
    navigationButtonActivation();
    firstSlideOnly();
} else if (!mediaQuery.matches) {
    sliderActivation();
};

const emailFormsActivation = () => {
    const emailForms = document.querySelectorAll('.form_email');
    if (emailForms.length > 0) {
        for (const f of emailForms) {
            const succesMessage = f.querySelector('.form_sent');
            if (succesMessage) {
                const submitSucces = (e) => {
                    e.preventDefault();
                    succesMessage.classList.toggle('form_sent_visible');
                };
                f.addEventListener('submit', submitSucces);
            };
        };
    };
};
const connectFormsActivation = () => {
    const connectForms = document.querySelectorAll('.footer__connect-form');
    if (connectForms.length > 0) {
        for (const f of connectForms) {
            const succesMessage = f.querySelector('.footer_form_sent');
            if (succesMessage) {
                const submitSucces = (e) => {
                    e.preventDefault();
                    succesMessage.classList.toggle('form_sent_visible');
                };
                f.addEventListener('submit', submitSucces);
            };
        };
    };
};

connectFormsActivation();
emailFormsActivation();