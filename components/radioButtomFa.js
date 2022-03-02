import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtomFa() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Fator de Atividade Física: </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="leve" control={<Radio />} label="leve" />
        <FormControlLabel value="moderado" control={<Radio />} label="moderado" />
        <FormControlLabel value="pesado" control={<Radio />} label="pesado" />
      </RadioGroup>
    </FormControl>
  );
}