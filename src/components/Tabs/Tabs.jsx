import React from 'react';

  const tab = {
    display: 'inline-block',
    padding: 10,
    margin: 10,
    borderBottom: '4px solid',
    borderBottomColor: '#ccc',
    cursor: 'pointer'
  };
  
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
  
  const TabList = props => {
      const children = React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === props.activeIndex,
          onClick: () => props.onActivate(index)
        })
      })
  
      return <div style={styles.tabs}>{children}</div>
  };
  
  const Tab = props => 
        <div
          onClick={props.disabled ? null : props.onClick}
          style={props.disabled ? styles.disabledTab : (
            props.isActive ? styles.activeTab : styles.tab
          )}
        >
          {props.children}
        </div>;
  
  const TabPanels = props => 
        <div style={styles.tabPanels}>
          {props.children[props.activeIndex]}
        </div>;
  
  const TabPanel = (props) => <div>{props.children}</div>;
   
  const Tabs = React.createClass({
    getInitialState() {
      return {
        activeIndex: 0
      }
    },
  
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
  })
  
  const App = () =>
          <Tabs>
            <TabList>
              <Tab>Tacos</Tab>
              <Tab disabled>Burritos</Tab>
              <Tab>Coconut Korma</Tab>
            </TabList>
  
            <TabPanels>
              <TabPanel>
                <p>Tacos are delicious</p>
              </TabPanel>
              <TabPanel>
                <p>Sometimes a burrito is what you really need.</p>
              </TabPanel>
              <TabPanel>
                <p>Might be your best option.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>;
  
  ReactDOM.render(<App/>, document.getElementById('app'))