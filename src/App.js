import React, { Component } from 'react';
import { Header } from './components/Header';
import { Persona } from './components/Persona';
import { Sidebar } from './components/Sidebar';
import { WIDTH_WIDE, NAME_VAR, INITIALS_VAR } from './constants';
import './App.css';
import initialItems from './mock/initialItems';
import mockFetchItems from './mock/mockFetchItems.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: initialItems,
      availItems: [],
      name: 'TESS',
    }
  }

  componentDidMount() {
    console.log('GET PERSONA FIELDS');
    this.setState({ availItems: mockFetchItems, initials: this.state.name.substr(0, 3).toUpperCase() });
  }

  modItem({title, attr, value, index}) {
    const { items: oldItems } = this.state;
    const items = oldItems.map((e, i) => {
      if (e.title + index === title + i) {
        e[attr] = value;
      }
      return e;
    });
    this.setState({ items });
  }

  addItem(item) {
    const { items } = this.state;
    items.push(item)
    this.setState({items});
    this.saveState();
  }

  deleteItem({title, index}) {
    const { items } = this.state;
    const newItems = items.filter((item, i) => item.title + i !== title + index);
    this.setState({ items: newItems });
    this.saveState()
  }

  handleElementClick(item, confirm) {
    const { items } = this.state;
    if (confirm) {
      const newItems = items.filter(item => !item.isTransition);
      newItems.push({...item, isTransition: false, isNew: true})
      this.saveState();
      return this.setState({ items: newItems, inTransition: false });
    }
    items.push({ ...item, isTransition: true })
    items.push({ ...item, isTransition: true, width: WIDTH_WIDE })
    return this.setState({ items, inTransition: true });
  }

  clearInTransition() {
    const { items } = this.state;
    const newItems = items.filter(item => !item.isTransition);
    this.setState({ items: newItems, inTransition: false });
  }

  changeStateVar({value: nv, name}) {
    let value = nv;
    if (name === INITIALS_VAR) {
      value = value.substr(0, 3).toUpperCase();
    }
    let newState = { [name]: value };
    if (name === NAME_VAR) {
      newState.initials = value.substr(0, 3).toUpperCase();
    }
    this.setState({...newState});
  }

  saveState() {
    console.log('SAVING');
    console.log(this.state);
  }

  render() {
    const {items, availItems, clientX, clientY, inTransition, name, initials} = this.state;
    return (
      <div className="App">
        <Header
          name={name}
          onChangeName={({ value }) => this.changeStateVar({name: NAME_VAR, value})}
          onBlur={() => this.saveState()}
        />
        <div className="main">
          {inTransition &&
            <div className="overlay" onClick={() => this.clearInTransition()}></div>
          }
          <Persona
            name={name}
            initials={initials}
            items={items}
            modItem={args => this.modItem(args)}
            clientX={clientX}
            clientY={clientY}
            onChange={args => this.changeStateVar(args)}
            setClicked={(item, confirm) => this.handleElementClick(item, confirm)}
            changeAttr={args => this.modItem(args)}
            deleteItem={args => this.deleteItem(args)}
            onBlur={() => this.saveState()}
          />
        </div>
        <div className="align-right sidebar" >
          {inTransition &&
            <div className="overlay" onClick={() => this.clearInTransition()}></div>
          }
          <Sidebar
            setClicked={(item, confirm) => this.handleElementClick(item)}
            items={availItems}
          />
        </div>
      </div>
    );
  }
}

export default App;
