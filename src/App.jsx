import React from 'react';
import { useState, useEffect } from 'react'
import './App.css'
import audioClips from './audioClips'
import DrumPad from './DrumPad';

function App() {

  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(0.3);


  const keyPressHandler = (event) => {
    const keyPressed = event.key.toUpperCase();
    const clip = audioClips.find(clip => clip.id === keyPressed);
    playSound(clip);
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    }
  }, [keyPressHandler]);

  const playSound = (clip) => {
    const audio = document.getElementById(clip.id)
    audio.currentTime = 0;
    let playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => { })
        .catch(error => {
          console.log(error);
        })
    }
    setDisplay(clip.text);
    audio.volume = volume;
    styleActiveKey(audio)
  }

  const styleActiveKey = (key) => {
    key.parentElement.style.backgroundColor = "#434242"
    key.parentElement.style.transform = "scale(0.92, 0.93)";
    setTimeout(() => {
      key.parentElement.style.backgroundColor = "#242424"
      key.parentElement.style.transform = "scale(1, 1)";
    }, 100)
  }

  return (
    <>
      <div id="drum-machine" >
        <h1>Drum machine</h1>
        <div id="display">
          <p>{display}</p>
        </div>

        <div className="drum-pads" >
          {audioClips.map((clip) =>
            <DrumPad
              clip={clip}
              key={clip.id}
              playSound={playSound}
            />
          )}

        </div>
        <h4>Volume</h4>
        <input className='volume'
          type="range"
          step="0.01"
          value={volume}
          min="0"
          max="1"
          onChange={(event) => setVolume(event.target.value)} />
      </div >
    </>
  );
}
export default App
