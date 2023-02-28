const transButton = document.querySelector('button')
const text = document.querySelector('.text')
const selectLang = document.querySelectorAll('select')

const animeURL = 'https://animechan.vercel.app/api/random'

selectLang.forEach((tag, id)=>{
    for(let country_code in countries){
        let selected = id == 0 ? country_code == "ru-RU" ? "selected" : "" : country_code == "de-DE" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}"> ${countries[country_code]} </option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})
transButton.addEventListener('click', ()=>{
    translateTo = selectLang[0].value;
    fetch(animeURL).then(res => res.json()).then(data =>{
        const anime = data.anime
        const character = data.character
        const quote = data.quote
        const textAnime = document.querySelector('.anime')
        textAnime.innerHTML = `Anime : ${anime} <br> Character: ${character}`
        const transTextURL = `https://api.mymemory.translated.net/get?q=${quote}!&langpair=en|${translateTo}`
        fetch(transTextURL).then(response => response.json()).then(data=>{
            data.matches.forEach(data =>{
                if(data.id === 0){
                    text.value = data.translation;
                }
            })
        })
    })

})

