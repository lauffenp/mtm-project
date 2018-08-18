import React from 'react';
import { Card, Input, Form, Image } from 'semantic-ui-react';
import { LONG_TEXT_TYPE, ONLY_IMAGE_TYPE, IMAGE_TYPE } from '../constants';
import markup from '../img/markup.png';

export class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnlyImage: props.field_type === ONLY_IMAGE_TYPE,
      isImage: props.field_type === IMAGE_TYPE,
    };
  }

  render() {
    const { image, title, imageSize, imageClass, data, disabled, index, isNew, deleteItem, clickHeader,
      fixed, isTransition, clickElement, field_type, changeAttr, onBlur } = this.props;
    const eleOnBlur = () => onBlur ? onBlur() : Function.prototype;
    const { isImage, isOnlyImage, mouseOver } = this.state;

    const textInput = field_type === LONG_TEXT_TYPE
      ? <Card.Content>
        <Image src={markup} />
        <Form>
          <Form.TextArea
            onBlur={eleOnBlur}
            value={data}
            error={!data}
            rows={2}
            disabled={disabled || !fixed}
            className="element-input"
            onChange={({target: { value }}) => changeAttr({ title, attr: 'data', value, index })}
          />
        </Form>
      </Card.Content>
      : <Input
        onBlur={eleOnBlur}
        error={!data}
        value={data}
        disabled={disabled || !fixed}
        className="element-input"
        onChange={({target: { value }}) => changeAttr({ title, attr: 'data', value, index })}
      />;

    let content = textInput;

    if (isImage) {
      content =
      <Image
        className={`ui card ${imageClass}`}
        src={image}
        rounded
        size={imageSize}
      />
    }

    let component = (
      <Card
        fluid
        onClick={() => (fixed || !clickElement) ? Function.prototype : clickElement()}
      >
        {typeof title === 'string' &&
          <Card.Header className="inline-flex-row" onClick={() => clickHeader ? clickHeader() : Function.prototype}>
            <Input
              onBlur={eleOnBlur}
              error={!title}
              value={title.toUpperCase()}
              disabled={disabled}
              onChange={({target: { value }}) => changeAttr({ title, attr: 'title', value, index })}
            />

            {!disabled &&
              <i
                className = {`${isNew ? 'fas fa-trash' : 'fa fa-cog'} align-right`}
                onClick={isNew ? () => deleteItem({title, index}) : Function.prototype}
              />
            }
          </Card.Header>
        }
        <Card.Content>
          {content}
        </Card.Content>
      </Card>
    );
    if (isTransition) {
      const props = {
        className: `opaque ${mouseOver ? 'mouseOver' : ''}`,
        onClick: () => clickElement(true),
        onMouseEnter: () => this.setState({ mouseOver: true }),
        onMouseLeave: () => this.setState({ mouseOver: false })
      };
      component = React.cloneElement(component, props);
    }

    if (isOnlyImage) {
      component =
        <Image
          className={`ui card ${imageClass}`}
          src={image}
          rounded
          size={imageSize}
        />
    }
    return component;
  }
};
