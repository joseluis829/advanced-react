import * as React from 'react'
import {Switch} from './switch'

class Toggle extends React.Component {
    state = { on: false }

    isControlled(prop) {
        return this.props[prop] !== undefined
    }

    getState() {
        return {
            on: this.isControlled('on') ? this.props.on : this.state.on
        }
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
 * Make Controlled React Components with Control Props
 */

 /**
  * While the state reducer pattern gives users total control over how the state is updated internally to a component, 
  * it doesn't allow them to update state arbitrarily. 
  * Let's implement the control props pattern (found in built-in components like <input /> through the value prop) 
  * to give users complete control over the state of our component.
  */