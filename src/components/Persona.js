import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Element } from './Element';
import girl from '../img/girl.png';
import { ONLY_IMAGE_TYPE, WIDTH_THIN, WIDTH_WIDE, NAME_VAR, INITIALS_VAR } from '../constants';

export class Persona extends React.Component {
  render() {
    const { name, items, changeAttr, onChange, initials, deleteItem, onBlur } = this.props;

    const headerElems = [
      {
        image: girl,
        imageClass: 'square',
        field_type: ONLY_IMAGE_TYPE
      },
      {
        title: 'Persona Name',
        data: name,
        changeAttr: args => onChange(Object.assign({}, args, { name: NAME_VAR }))
      },
      {
        title: 'short name',
        data: initials,
        changeAttr: args => onChange(Object.assign({}, args, { name: INITIALS_VAR }))
      }
    ].map((e, i) =>
      <Element
        key={i}
        {...e}
        fixed
        onBlur={() => onBlur()}
      />)
    const elements = items.map((e, i) => <Element
      key={`${i}-${e.width === WIDTH_WIDE ? 'l' : 'r'}`}
      {...e}
      index={i}
      fixed
      changeAttr={(args) => changeAttr(args)}
      deleteItem={args => deleteItem(args)}
      onBlur={() => onBlur()}
      clickElement={(confirm) => e.isTransition ? this.props.setClicked(e, confirm) : Function.prototype}
    />)
    const leftGridElements = elements.filter(e => (!e.props.width || e.props.width === WIDTH_THIN))
    const rightGridElements = elements.filter(e => (e.props.width === WIDTH_WIDE))
    return (
      <Grid>
        <Grid.Column width={16}>
          <Grid.Row className="grid-header">
            {headerElems}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column
          width={4}
        >
          {leftGridElements}
        </Grid.Column>
        <Grid.Column
          width={12}
        >
          {rightGridElements}
        </Grid.Column>
      </Grid>
    );
  }
};
