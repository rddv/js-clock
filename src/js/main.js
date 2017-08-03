//(function () {
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

    //search

    //const endPoint = 'http://data.okfn.org/data/core/world-cities/r/world-cities.json';
    const endPoint = 'https://restcountries.eu/rest/v2/all';
    const cities = [];
    const searchInput = document.querySelector('.search__input');
    const searchList = document.querySelector('.search__list');
    fetch(endPoint).then(blob => blob.json()).then(data => {
        return cities.push(...data);
    });

    console.log(cities);
    function findMatches(textToMathes, cities){
        const regexp = new RegExp(textToMathes, 'gi');
        return cities.filter(item => {
            return item.name.match(regexp);
        });
    }
    function makeItems(e){
        const matches = findMatches(this.value, cities);
        const makeList = matches.map(item => {
            const regexp = new RegExp(this.value, 'gi');
            const countryName = item.name.replace(regexp, `<span class="search__city-bg">${this.value}</span>`)
            return `<li class="search__item">
                <span class="search__city">${countryName}</span>
                <span class="search__country">${item.capital}</span>
            </li>`;
        });
        searchList.innerHTML = makeList.join('');
    }

    searchInput.addEventListener('keyup', makeItems);

//})();