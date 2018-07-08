import React from 'react';
import {Switch} from './switch'

const ToggleContext = React.createContext({
    on: false,
    toggle: () => {},
})

class Toggle extends React.Component {
    static Consumer = ToggleContext.Consumer
    toggle = () => {
        this.setState(
            ({on}) => ({on: !on}),
            () => this.props.onToggle(this.state.on),
        )
    }

    state = { on: false, toggle: this.toggle }

    render() {
        return <ToggleContext.Provider value={this.state} {...this.props} />
    }
}

const Layer1 = () => <Layer2 />
const Layer2 = () => (
    <Toggle.Consumer>
        {({on}) => (
            <React.Fragment>
                {on ? 'The button is on' : 'The button is off'}
                <Layer3 />
            </React.Fragment>
        )}
    </Toggle.Consumer>
    
)
const Layer3 = () => <Layer4 />
const Layer4 = () => (
    <Toggle.Consumer>
        {
            ({on, toggle}) => <Switch on={on} onClick={toggle} />
        }
    </Toggle.Consumer>
)


function Usage({
    onToggle = (...args) => console.log('onToggle', ...args),
}) {
    return(
        <Toggle onToggle={onToggle}>
            <Layer1 />
        </Toggle>
    )
}

export default Usage

/**
 * Implement the Provider Pattern with React Context
 */

 /**
  * The prop drilling problem can be frustrating for data that changes over time and is needed throughout the application. 
  * Luckily for us, we can use React's createContext API to make state (like on) and state updater functions (like toggle) 
  * available anywhere in the tree. 
  * In this lesson let's see how to side-step the prop drilling problem with a custom context provider and consumer.
  */