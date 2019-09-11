import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import Input from '../../Partials/Input';
import Section from '../../Partials/Section';

const UpdatePassword = ({ state, onChange }) => (
  <Section title="Update password">
    <Section.Sub>
      <span>Password:</span>
      <Input
        name="password"
        label="Password"
        value={state.password}
        onChange={onChange}
      />
    </Section.Sub>

    <Section.Sub>
      <span>Password confirmation:</span>
      <Input
        name="confirmPassword"
        label="Password confirmation"
        value={state.confirmPassword}
        onChange={onChange}
      />
    </Section.Sub>
  </Section>
);

export default UpdatePassword;
