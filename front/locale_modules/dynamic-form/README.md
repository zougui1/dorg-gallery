# API

## Form component

* submitText: (_string_) text on the submit button
* redirection: (_string_) the redirection path
* title: (_string_) form's title
* field: (_node_) field's component to use
* errorMessage: (_string_) error message from an external source
* redirect: (_boolean_) say if the redirection can be done
* children: (_node_) component (or classic HTML) to put below the submit button
* rangeField: (_node_) field's component to use for range
* selectField: (_node_) field's component to use for select
* onSubmit: (_function_) onSubmit event for the form
* onFocus: (_function_) onFocus event for all the fields
* onBlur: (_function_) onBlur event for all the fields
* fields: (_array of node_) the fields to put in the form

## the fields object

* name: (_string_) the field's name
* value: (_string_) the field's default value
* label: (_string_) the field's label
* placeholder: (_string_) the field's placeholder
* elementType: (_string_) the field's elementType
* options: (_array_) the field's options (select)
* type: (_string_) the field's type
* min: (_string_) the field's min value (input of type number and range)
* max: (_string_) the field's max value (input of type number and range)
* minlength: (_string_) the field's minlength
* maxlength: (_string_) the field's maxlength
* step: (_string_) the field's step (range)
* validations: (_array_) the field's validations
* onFocus: (_function_) the field's onFocus event
* onBlur: (_function_) the field's onBlur event
* onChange: (_function_) the field's onChange event
* field: (_node_) the field's field component
* rangeField: (_node_) the field's rangeField component
* selectField: (_node_) the field's selectField component
