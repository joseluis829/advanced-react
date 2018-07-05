import * as React from 'react'
import {Switch} from './switch'

class Toggle extends React.Component {
    state = { on: false, happy: 'yeah' }

    isControlled(prop) {
        return this.props[prop] !== undefined
    }

    getState() {
        console.log('Object.entries(this.state)', Object.entries(this.state))

        return Object.entries(this.state).reduce(
            //Addition function (AccumulatorValue, currentValue)
            (combinedState, [key, value]) => {
                console.log('combinedState', combinedState);
                console.log('[key, value]', [key, value]);
                
                if(this.isControlled(key)) {
                    combinedState[key] = this.props[key]
                } else {
                    combinedState[key] = value
                }
                return combinedState
            }, 
            {}, //Initial value for combinedState
        )
        /*return {
            on: this.isControlled('on') ? this.props.on : this.state.on
        }*/
    }

    toggle = () => {
        if (this.props.on !== undefined) {
            this.props.onToggle(!this.getState().on)
        } else {
            this.setState(
                ({on}) => ({on: !on}),
                () => {
                    this.props.onToggle(this.getState().on)
                },
            )
        }
    }

    render() {
        return (
            <Switch on={this.getState().on} onClick={this.toggle} />
        );
    }
}

class Usage extends React.Component {
    state = { bothOn: false }

    handleToggle = on => {
        this.setState({bothOn: on})
    }

    render() {
        const {bothOn} = this.state
        return (
            <div>
                <Toggle onToggle={this.handleToggle} />
                <Toggle on={bothOn} onToggle={this.handleToggle} />
            </div>
        );
    }
}

export default Usage;



/** 
 * Support Control Props for all state
 */

/**
 * Our current implementation of control props only supports controlling the state of a single item of state. 
 * Let's make our solution more generic to support any and all state of our component using Object.entries.
 */