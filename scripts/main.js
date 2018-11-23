function tts(){
    this.mainComp = document.querySelector('.form-control');
    this.btnClick = document.getElementById('btnClick');
    this.utterance = new SpeechSynthesisUtterance();
}

tts.prototype.init = function(){
    this.btnClick.addEventListener('click',()=>{
        this.utterance.text = this.mainComp.value;

        this.utterance.lang = 'en-GB'; // language, default is 'en-US'
        this.utterance.volume = 0.8;   // volume, from 0 to 1, default is 1
        this.utterance.rate = 0.9;  

        window.speechSynthesis.speak(this.utterance);
    })    
}

tts.prototype.readMultipleFiles = function(evt){
    var files = evt.target.files;

    if(files){
        for(var i = 0,f; f= files[i]; i++){
            var r = new FileReader();
            r.onload = (function(f){
                return function(e){
                    var contents = e.target.result;
                    document.querySelector(".form-control").value = contents;
                }
            })(f);
            r.readAsText(f);
        }
    }else{
        alert("Failed to load files");
    }
}
var main = new tts();
main.init();
document.getElementById('fileinput').addEventListener('change', main.readMultipleFiles, false);



