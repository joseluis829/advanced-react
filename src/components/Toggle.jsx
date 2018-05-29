import React, { Component } from 'react';
import Switch from "./Switch";

    function ToggleOn({on, children}) {
        return on ? children : null
    }

    function ToggleOff({on, children}) {
        return on ? null : children
    }

    function ToggleButton({on, toggle, ...props}) {
        return (
            <Switch on={on} onClick={toggle} {...props} />
        )
    }

class Toggle extends Component {

    static On = ToggleOn

    static Off = ToggleOff
  
    static Button = ToggleButton

    static defaultProps = {onToggle: () => {}}

    state = { on: false }

    toggle = () => this.setState(({on}) => ({on: !on}), () => {
        this.props.onToggle(this.state.on)
    })

    render() {
        const children = React.Children.map(
            this.props.children,
            child => 
                React.cloneElement(child, {
                    on: this.state.on,
                    toggle: this.toggle,
                })
        )
        const {on} = this.state
        return (
            <div>{children}</div>
        );
        //<Switch on={on} onClick = {this.toggle} />
    }
}

export default Toggle;