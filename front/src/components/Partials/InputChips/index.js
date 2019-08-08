import React from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 52,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const InputChips = ({ onChange, value, suggestions }) => {
  value = value || [];
  const classes = useStyles();
  const theme = useTheme();

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const handleKeyPress = e => {
    const self = e.target;
    const inputValue = self.value.trim();
    const triggerChange = e.key === 'Enter' || e.key === ',' || e.key === ' ';

    if (triggerChange) {
      e.preventDefault();
    }

    if (inputValue.length === 0) {
      return;
    }

    if (triggerChange) {
      if (value.find(v => v.label.toLowerCase() === inputValue.toLowerCase())) {
        e.target.value = '';
      } else {
        onChange([
            ...value,
            { label: inputValue }
        ]);
      }
      e.target.blur();
      e.target.focus();
    }
  }

  const removeValue = label => {
    label = label.toString();
    onChange(value.filter(v => v.label !== label));
  }

  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={clsx(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={() => removeValue(props.children)}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }

  function Control(props) {
    const {
      children,
      innerProps,
      innerRef,
      selectProps: { classes, TextFieldProps },
    } = props;

    return (
      <TextField
        fullWidth
        onKeyPress={handleKeyPress}
        InputProps={{
          inputComponent,
          inputProps: {
            className: classes.input,
            ref: innerRef,
            children,
            ...innerProps,
          },
        }}
        {...TextFieldProps}
      />
    );
  }

  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          TextFieldProps={{
            label: 'Tags',
            InputLabelProps: {
              htmlFor: 'react-select-multiple',
            },
          }}
          placeholder=""
          options={suggestions}
          components={components}
          value={value}
          onChange={onChange}
          isMulti
        />
      </NoSsr>
    </div>
  );
}

export default InputChips;
