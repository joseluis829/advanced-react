import React from 'react';

const Switch = ({on, className = '', ...props}) => { 

    return (
        <div className='toggle'>
            <input className='toggle-input' type='checkbox'/>
            <button
                className={`${className} toggle-btn ${on ? 'toggle-btn-on' : 'toogle-btn-off'}`}
                aria-expanded = {on}
                {...props} 
            />
        </div>
    );

}

export default Switch;