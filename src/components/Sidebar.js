import React from 'react';
import {SideBarElement} from './SideBarElement';
import { Grid, Header, Image } from 'semantic-ui-react';
import missing from '../img/missing.png'

export class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSidebar: true,
    }
  }
  render() {
    const { showSidebar = true } = this.state;
    const { items } = this.props;
    return (
      <Grid>
        <Grid.Row
          className={`grid-header ${showSidebar ? '' : 'hidden'}`}
          onClick={() => !showSidebar ? this.setState({ showSidebar: true }) : Function.prototype}
        >
          <span>{'Add Element'.toUpperCase()}</span>
          <i className="fa fa-times align-right" onClick={() => this.setState({ showSidebar: false })}/>
        </Grid.Row>
        {showSidebar &&
          <Grid.Row>
            <Header as="h3">Add Element To Persona</Header>
          </Grid.Row>
        }
        {showSidebar &&
          <Grid.Row className="lb">
            <Header as="h5">
            Click or drag & drop one of the element types below to add
it to the persona. <br/>
Click on the  <i className="fa fa-cog"/>  icon of each element to edit its settings.
You can reorder the elements by dragging them.
            </Header>
          </Grid.Row>
        }
        {showSidebar &&
          <Grid.Row columns={2}>
            {items.map((e, i) =>
              <Grid.Column key={i} >
                <SideBarElement {...e} clickElement={() => this.props.setClicked(e)}/>
              </Grid.Column>
            )
            }
          </Grid.Row>
        }
        {showSidebar &&
          <Image src={missing} className="missing" />
        }
      </Grid>
    )
  }
}
