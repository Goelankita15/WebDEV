// Init speech synthesis API
const synth = window.speechSynthesis;

const textform = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init Voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    //Lopp through voices and create option for each one
    voices.forEach(voice => {
        //Create option element
        const option = document.createElement('option');

        //fill option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';

        //set needed option attributes
        option.setAttribute('data-lang' , voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();
// Corrected event listener assignment
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


//Speak
const speak = () => {


    if(synth.speaking){
        console.error('Already Speaking');
        return;
    }

    if(textInput.value !==''){
        //Get Speak Text
        body.style.background = 'black url(s.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end
        speakText.onend = e =>{
            console.log('done speaking');
        }

        speakText.onerror = e =>{
            console.error('something went wrong');
        }

        const selected = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //lopp thoungh voices
        voices.forEach(voice =>{
            if(voice.name === selected){
                speakText.voice = voice;
            }
        });

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        synth.speak(speakText);
    }
};

textform.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change', e => rateValue.textContent = rate.value);

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);


voiceSelect.addEventListener('change', e=> speak());

