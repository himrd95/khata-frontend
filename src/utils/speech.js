const speak = (msg) => {
	const sp = new SpeechSynthesisUtterance(msg);
	[sp.voice] = speechSynthesis.getVoices();
	speechSynthesis.speak(sp);
};

export default speak;
// speak("My name is Himanshu"+"I am a fullstack developer");
