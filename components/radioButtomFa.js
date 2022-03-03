import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//Receive the setFa the the age and the sex of the pacient (?)


export default function RadioButtomFa(props) {

  function handleChange(event) {
    console.log(event.target.value);
    props.setRadioFa(event.target.value);
}


  return (
    <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Fator de Atividade Física: </FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="leve" control={<Radio />} label="leve" />
        <FormControlLabel value="moderado" control={<Radio />} label="moderado" />
        <FormControlLabel value="pesado" control={<Radio />} label="pesado" />
      </RadioGroup>
    </FormControl>
  );
}