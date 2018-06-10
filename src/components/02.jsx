import React from 'react';
import { Switch } from './switch'

class Toggle extends React.Component {

    static On = ({on, children}) => (on ? children: null)
    static Off = ({on, children}) => (on ? null : children)

    static Button = ({on, toggle, ...props}) => (
        <Switch on={on} onClick={toggle} {...props} />
    )

    state = { on: false }

    toggle = () => {
        this.setState(
            ({on}) => ({on: !on}), 
            () => {
                this.props.onToggle(this.state.on)
            },
        )
    }

    render() {
        returnReact.Children.map(this.props.
            children, childElement => {
            React.cloneElement(childElement, {
                on: this.state.on,
                toggle: this.toggle.
            })
        })
    }
}

function Usage({
    onToggle = (...args) => console.log('onToggle', ...args), 
}) {
    return (
        <Toggle onToggle={onToggle} >
            <Toggle.On>The button is on</Toggle.On>
            <Toggle.Off>The button is off</Toggle.Off>
            <Toggle.Button />
        </Toggle>
    )
}

export default Usage;