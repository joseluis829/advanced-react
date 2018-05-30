import * as React from 'react';
import ReactDOM from "react-dom";

  /** Style for tab */
  const tab = {
    display: 'inline-block',
    padding: 10,
    margin: 10,
    borderBottom: '4px solid',
    borderBottomColor: '#ccc',
    cursor: 'pointer'
  };
  
  /** Styles for the component */
  const styles = {
    tab,
    activeTab: {
      ...tab,
      borderBottomColor: '#000' },
    disabledTab: {
      ...tab,
      opacity: 0.25,
      cursor: 'default' },
    tabPanels: {
      padding: 10 }
  };
  
  /** TabList functional component */
  const TabList = props => {
      /**
       * Process the children 
       * go to every child and set the isActive property and onClick Function (cloning)
       * */
      const children = React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === props.activeIndex,
          onClick: () => props.onActivate(index)
        })
      })
      /** Return the element with its new children */
      return <div style={styles.tabs}>{children}</div>
  };
  
  /** Tab SFC that shows the tab with the label */
  const Tab = props => 
        <div
          onClick={props.disabled ? null : props.onClick}
          style={props.disabled ? styles.disabledTab : (
            props.isActive ? styles.activeTab : styles.tab
          )}
        >
          {props.children}
        </div>;
  
  /** Tab Panel Group SFC */
  const TabPanels = props => 
        <div style={styles.tabPanels}>
          {props.children[props.activeIndex]}
        </div>;
  
  /** The div for the panel */
  const TabPanel = (props) => <div>{props.children}</div>;
   
  /** The most outter element. Class that has the states */
  class Tabs extends React.Component {
    
    state = {
      activeIndex: 0
    }
  
    render() {
      const children = React.Children.map(this.props.children, (child, index) => {
        if (child.type === TabPanels) {
          return React.cloneElement(child, {
            activeIndex: this.state.activeIndex
          })
        } else if (child.type === TabList) {
          return React.cloneElement(child, {
            activeIndex: this.state.activeIndex,
            onActivate: (activeIndex) => this.setState({ activeIndex })
          })
        } else {
          return child
        }
      })
  
      return <div>{children}</div>
    }
  }

  export class DataTabs extends React.Component{
    render() {
      const { data } = this.props
      return (
        <Tabs>
          <TabList>
            {data.map(tab => (
              <Tab>{tab.label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {data.map(tab => (
              <TabPanel>{tab.description}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )
    }
  }
  
