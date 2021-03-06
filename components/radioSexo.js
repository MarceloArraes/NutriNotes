import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import React from 'react';


export default function RadioSexo(props){

  function handleChange(event) {
      console.log(event.target.value);
      props.setSexo(event.target.value);
  }

  return(
      <FormControl disabled={props.isDisabled}>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="mulher"
          name="radio-row-buttons-group"
          onChange={handleChange}
      >
          <FormControlLabel value="mulher" control={<Radio />} label="Mulher" />
          <FormControlLabel value="homem" control={<Radio />} label="Homem" />
      </RadioGroup>
      </FormControl>
  )
}