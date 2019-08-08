import React from 'react';
import TextField from '@material-ui/core/TextField';

class Field extends React.Component {

  state = {
    input: React.createRef()
  }

  render() {
    let { name, type, label, onChange, field } = this.props;
    let Field = field || TextField;

    return (
      <Field
        fullWidth
        onChange={onChange}
        name={name}
        label={label}
        id={name}
        className={name}
        type={type}
      />
    );
  }
}

export default Field;
