import React from 'react';

import Input from '../../Partials/Input';
import Section from '../../Partials/Section';

const Blacklist = ({ state, onChange }) => (
  <Section title="Blacklist">
    <Section.Sub>
      <span>Tag blacklist</span>
      <Input
        name="blacklist"
        value={state.blacklist}
        onChange={onChange}
        fullWidth
        multiline
        rows={7}
      />
    </Section.Sub>
  </Section>
);

export default Blacklist;
