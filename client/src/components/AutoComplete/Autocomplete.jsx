import React from 'react';
import CreateableSelect from 'react-select/creatable';
import Select from 'react-select';

const cityOptions = [
    { value: 'NYC', label:"New York"},
    { value: 'LA', label:"Los Angeles"},
    { value: 'San Fran', label:"San Fransisco"},
    { value: "Houston", label:"Houston"},
    { value: "Not Houston", label:"Not Houston"},
    
]

const Autocomplete = () => {
  return (
    <CreateableSelect label="city" name='city' options={cityOptions} />
  )
}

export default Autocomplete