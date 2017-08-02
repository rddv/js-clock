(function () {
    // clock
    const secArrow = document.querySelector('.clock__arrow--second');
    const minArrow = document.querySelector('.clock__arrow--min');
    const hourArrow = document.querySelector('.clock__arrow--hour');

    function setTime(){
        const now = new Date();
        const sec = now.getSeconds();
        const secDegree = ((sec / 60) * 360) + 90;
        secArrow.style.transform = `rotate(${secDegree}deg)`;

        const min = now.getMinutes();
        const minDegree = ((min / 60) * 360) + 90;
        minArrow.style.transform = `rotate(${minDegree}deg)`;

        const hour = now.getHours();
        const hourDegree = ((hour / 12) * 360) + 90;
        hourArrow.style.transform = `rotate(${hourDegree}deg)`;
    }
    if (secArrow){
        setInterval(setTime, 1000);
    }
    // css variables

    const formInputs = document.querySelectorAll('.variables-form__input');
    if (formInputs){
        formInputs.forEach(input => input.addEventListener('change', handleValue));
        formInputs.forEach(input => input.addEventListener('mousemove', handleValue));
        function handleValue(e){
            const unit = (this.type === 'color' ? '' : 'px');
            document.documentElement.style.setProperty(`--${this.id}`, this.value + unit);
            console.log(this.value);
        }
    }

    //gallery

    const galleryItems = document.querySelectorAll('.gallery__item');
    console.log(galleryItems);
    function showGallery() {
        this.classList.toggle('active');
    }
    function showText(e) {
        console.log(e);
        if (e.propertyName === 'font-size'){
            this.classList.toggle('show');
        }
    }
    if (galleryItems){
        galleryItems.forEach(item => (item.addEventListener('click', showGallery)));
        galleryItems.forEach(item => (item.addEventListener('transitionend', showText)));
    }

})();