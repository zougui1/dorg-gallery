import React from 'react';

import Input from '../../Partials/Input';
import Section from '../../Partials/Section';

const AccountSettings = ({ state, onChange }) => (
  <Section title="Account settings">
    <Section.Sub>
      <span>Username:</span>
      <Input
        name="username"
        value={state.username}
        onChange={onChange}
      />
    </Section.Sub>
  </Section>
);

export default AccountSettings;

/*

  <Grid md={11} container item className="bg-color-grey-darken-4 color-grey-lighten-2 p-4">
    <Grid container item direction="column">
      <Typography variant="h6">Update your password</Typography>

      <Grid container item alignItems="center">
        <Grid md={4} item>
          <span>Password:</span>
        </Grid>
        <Grid item>
          <Input
            name="password"
            label="Password"
            value={state.password}
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <Grid container item alignItems="center">
        <Grid md={4} item>
          <span>Password confirmation:</span>
        </Grid>
        <Grid item>
          <Input
            name="confirmPassword"
            label="Password confirmation"
            value={state.confirmPassword}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  */
