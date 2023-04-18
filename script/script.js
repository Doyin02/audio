const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis;
isSpeaking = true;

voices();

function voices(){
    for (let voice of synth.getVoices()) {
        //console.log(voice);
        let selected = voice.name === "Microsoft David - English (United States)" ? "selected" : ""; //DEFAULT SELECTED
        //CREATING OPTION TAGS FOR VOICE SPEECH
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);   //INSERTING OPTION TAG BEFOREEND OF SELECT TAG
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        //IF THE AVAILABLE DEVICE VOICE NAME IS EQUALS TO THE USER SELECTED VOICE NAME, (THEN) SET THE SPEECH TO THE USER SELECTED VOICE.
        if (voice.name === voiceList.value) { 
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e=>{
    e.preventDefault();

    if (textarea.value !== "") {
        if (!synth.speaking) {
            //IF AN UTTERANCE / SPEECH IS NOT CURRENTLY IN THE PROCESS OF SPEAKING
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            //IF isSpeaking IS TRUE, THEN CHANGE ITS VALUE TO FALSE AND RESUME THE UTTERANCE (ELSE) CHANGE ITS VALUE TO TRUE AND PAUSE THE SPEECH
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerHTML = "Pause Audio";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerHTML = "Resume Audio";
            }

            //CHECKING, IS UTTERANCE/SPEECH IN SPEECKING PROCESS OR NOT IN EVERY 100 ms (IF) NOT, THEN SET THE VALUE OF isSpeaking TO TRUE AND CHANGE THE BUTTON TEXT.
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerHTML = "Convert To Audio";
                }
            });
        }else{
            speechBtn.innerHTML = "Convert To Audio";
        }
    }
});