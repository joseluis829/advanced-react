import React from "react";
import { Switch } from "../components/switch";

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Toggle extends React.Component {

    static defaultProps = {
        initialOn: false,
        onReset: () => {},
    }

    initialState = { on: this.props.initialOn }
    state = this.initialState

    internalSetState(changes, callback) {
        this.setState(state => {
            const changesObject = typeof changes === 'function' ? changes(state) : changes
            const reducedChanges = this.props.stateReducer(state, changesObject)
            return reducedChanges
        }, callback)
    }

    reset = () => {
        this.internalSetState(this.initialState, () => this.props.onReset(this.state.on) )
    }

    toggle = () =>
        this.internalSetState(
            ({on}) => ({on: !on}),
            () => this.props.onToggle(this.state.on),
        )

    getTogglerProps = ({onClick, ...props} = {}) => {
        return {
            'aria-pressed': this.state.on,
            onClick: callAll(onClick, this.toggle),
            ...props,
        }
    }

    getStateAndHelpers() {
        return {
            on: this.state.on,
            toggle: this.toggle,
            reset: this.reset,
            getTogglerProps: this.getTogglerProps,
        }
    }

    render() {
        return (
            this.props.children(this.getStateAndHelpers())
        );
    }
}

class Usage extends React.Component {
    initialState = {timesClicked: 0}
    state = this.initialState

    handleToggle = (...args) => {
        this.setState((({timesClicked}) => ({
            timesClicked: timesClicked + 1,
        })))
    }

    handleReset = (...args) => {
        this.setState(this.initialState)
    }

    toggleStateReducer = (state, changes) => {
        if(this.state.timesClicked > 4) {
            return {...changes, on: false}
        }
        return changes
    }

    render() {
        const {timesClicked} = this.state
        return (
            <Toggle 
                stateReducer={this.toggleStateReducer}
                onToggle={this.handleToggle}
                onReset={this.handleReset}
            >
                {({getTogglerProps, reset, toggle, on}) => (
                    <div>
                        <Switch 
                            {...getTogglerProps({
                                on,
                            })}
                        />
                        {
                            timesClicked > 4 ? (
                                <div>
                                    Whoa, you clicked too much!
                                    <br />
                                </div>
                            ) : timesClicked > 0 ? (
                                <div>Click count: {timesClicked}</div>
                            ) : null
                        }
                        <button onClick={reset}>Reset</button>
                    </div>
                )}
            </Toggle>
        )
    }

}

Usage.title = 'State Reducers'
export {Toggle, Usage as default}

/**
 * Implement Component State Reducers
 */

 /**
  * Often with reusable components, the logic needs to be adjusted to handle various use cases. 
  * Rather than filling our component event handlers with if statements and loading our state with one-off properties, 
  * we can expose our state directly to users of our reusable component 
  * in a way that's flexible and simple with a state reducer.
  */