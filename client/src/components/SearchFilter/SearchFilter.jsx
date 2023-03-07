import { MDBSwitch } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import Select from 'react-select';

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const colourOptions = [
    {value: 'chocolate', label: 'chocolate'},
    {value: 'strawberry', label: 'strawberry'},
    {value: 'vanilla', label: 'vanilla'},
]

export default () => {
//   const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={colourOptions[0]}
        isLoading={isLoading}
        isClearable='true'
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={colourOptions}
      />

      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
        <MDBSwitch id="remoteWork" label="Remote Work" />
        <Checkbox
          checked={isLoading}
          onChange={() => setIsLoading((state) => !state)}
        >
          Loading
        </Checkbox>
        <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
          RTL
        </Checkbox>
      </div>
    </>
  );
};