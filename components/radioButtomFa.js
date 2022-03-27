import React from 'react';
import { useEffect, useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//Receive the setFa the the age and the sex of the pacient (?)


export default function RadioButtomFa(props) {
  const [faRadioButtonValue, setFaRadioButtonValue]=useState('');

  function handleChange(event) {
    console.log(event.target.value);
    props.setRadioFa(event.target.value);
}

useEffect(() => {
  if(props.radioFa === ""){
    setFaRadioButtonValue('');
  }else{
    setFaRadioButtonValue(props.radioFa);
  }

}, [props.radioFa])


  return (
    <FormControl disabled={props.isDisabled}>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Fator de Atividade Física: </FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={faRadioButtonValue}
      >
        <FormControlLabel value="leve" control={<Radio />} label="leve" />
        <FormControlLabel value="moderado" control={<Radio />} label="moderado" />
        <FormControlLabel value="pesado" control={<Radio />} label="pesado" />
        <FormControlLabel value="acamado" control={<Radio />} label="acamado" />
        <FormControlLabel value="acamadoMovimento" control={<Radio />} label="acamado+movimento" />
        <FormControlLabel value="ambulante" control={<Radio />} label="ambulante" />
      </RadioGroup>
    </FormControl>
  );
}