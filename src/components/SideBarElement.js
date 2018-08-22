import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import { LONG_TEXT_TYPE, LONG_TEXT_DEFAULT } from '../constants';

export const SideBarElement = ({ clickElement, field_type }) => {
  const textInput = field_type === LONG_TEXT_TYPE
    ? <p>{LONG_TEXT_DEFAULT}</p>
    : <Header as="h2">ABC</Header>

  let content = textInput;

  let component = (
    <Card
      className="sidebar-card"
      onClick={() => clickElement()}
    >
      <Card.Content>
        {content}
        <Header as="h4">
          {field_type !== LONG_TEXT_TYPE ? 'short text'.toUpperCase() : 'long text'.toUpperCase()}
        </Header>
      </Card.Content>
    </Card>
  );
  return component;
}
