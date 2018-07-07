import * as React from 'react'
import {Switch} from './switch'

class Toggle extends React.Component {
    static defaultProps = {
        onToggle: () => {},
        onStateChange: () => {},
    }
    static stateChangeTypes = {
        toggleOn: '__toggle_on__',
        toggleOff: '__toggle_off__',
        toggle: '__toggle__',
    }

    state = { on: false }

    isControlled(prop) {
        return this.props[prop] !== undefined
    }

    getState(state = this.state) {
        return Object.entries(state).reduce(
            //Addition function (AccumulatorValue, currentValue)
            (combinedState, [key, value]) => {
                if(this.isControlled(key)) {
                    combinedState[key] = this.props[key]
                } else {
                    combinedState[key] = value
                }
                return combinedState
            }, 
            {}, //Initial value for combinedState
        )
    }

    internalSetState(changes, callback) {
        let allChanges
        this.setState(state => {
            const combinedState = this.getState(state)
            const changesObject = typeof changes === 'function' ? changes(combinedState) : changes
            allChanges = changesObject
            //Do this to avoid a rerender for a change in type
            const {type: ignoredType, ...onlyChanges} = changesObject

            const nonControlledChanges = Object.entries(onlyChanges).reduce((newChanges, [key, value]) => {
                if (!this.isControlled(key)) {
                    newChanges[key] = value
                }
                return newChanges
            }, {})

            return Object.keys(nonControlledChanges).length ? nonControlledChanges : null
        }, 
        () => {
            this.props.onStateChange(allChanges, this.getState())
            callback()
        })
    }

    toggle = ({on: newState, type}) => {
        this.internalSetState(
            ({on}) => {
                return ({
                    on: typeof newState === 'boolean' ? newState : !on,
                    type,
                })
            },
            () => {
                this.props.onToggle(this.getState().on)
            },
        )
    }

    handleSwitchClick = () => this.toggle({type: Toggle.stateChangeTypes.toggle})
    handleOffClick = () => this.toggle({on: false, type: Toggle.stateChangeTypes.toggleOff})
    handleOnClick = () => this.toggle({on: true, type: Toggle.stateChangeTypes.toggleOn})

    render() {
        return (
            <div>
                <Switch on={this.getState().on} onClick={this.handleSwitchClick} />
                <button onClick={this.handleOffClick}>off</button>
                <button onClick={this.handleOnClick}>on</button>
            </div>            
        );
    }
}

class Usage extends React.Component {
    state = { bothOn: false }
    lastWasButton = false

    handleStateChange = changes => {
        const isButtonChange = changes.type === Toggle.stateChangeTypes.toggleOn || changes.type === Toggle.stateChangeTypes.toggleOff
        if ((this.lastWasButton && isButtonChange) || changes.type === Toggle.stateChangeTypes.toggle) {
            this.setState({bothOn: changes.on})
            this.lastWasButton = false
        } else {
            this.lastWasButton = isButtonChange
        }
    }

    render() {
        const {bothOn} = this.state
        return (
            <div>
                <Toggle on={bothOn} onStateChange={this.handleStateChange} />
                <Toggle on={bothOn} onStateChange={this.handleStateChange} />
            </div>
        );
    }
}

export default Usage;



/** 
 * Improve the usability of Control Props with state change types
 */

/**
 * Our onStateChange handler is great, but it's limited in capacity because we don't know why certain state is changing. 
 * By adding stateChangeTypes to our component, it allows consumers of our component to have more insight into 
 * how to respond to certain changes.
 */