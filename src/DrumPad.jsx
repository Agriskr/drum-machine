import React from 'react'

const DrumPad = (props) => {

    return (
        <div
            className="drum-pad"
            onClick={() => props.playSound(props.clip)}
            key={props.clip.key}
            id={props.clip.key}
        >
            {props.clip.id}
            <audio className='clip'
                id={props.clip.id}
                src={props.clip.src}
            />
        </div>
    )
}
export default DrumPad