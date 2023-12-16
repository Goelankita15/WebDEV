const Typewriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
Typewriter.prototype.type = function(){
    // Current Index of word
    const current = this.wordIndex % this.words.length;

    //get full text;
    const fullTxt = this.words[current];

    //if in deliting state
    if(this.isDeleting){
        //Remove
        this.txt= fullTxt.substring(0, this.txt.length-1);
    }else{
        //Add
        this.txt= fullTxt.substring(0, this.txt.length+1);
    }

    //Insert txt in span tag
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Type speed
    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait;

        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex++;

        typeSpeed = 500;
    }
    setTimeout(()=>{
        this.type();
    }, typeSpeed);
}

//Init on dom load
document.addEventListener('DOMContentLoaded', Init);

//Init App
function Init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init Typewriter
    new Typewriter(txtElement, words, wait);
}