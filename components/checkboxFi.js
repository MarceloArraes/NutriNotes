import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxFi() {
  const [isInjured, setIsInjured] = React.useState(false);
  //const [injury, setInjury] = React.useState([]);

   const [injury, setInjury] = React.useState({
    Condição_Clínica: false,
    Desnutrição_grave: false,
    Pequena_cirurgia_eletiva: false,
    Pós_operatório_geral: false,
    Peritinote: false,
    Sepse: false,
    Infecção_grave: false,
    Câncer: false,
    Traumatismo_de_tecidos_moles:false,
    Fraturas_múltiplas:false,
    Queimadura_até_20: false,
    Queimadura_20_a_40: false,
    Queimadura_até_40_a_100: false,
  }); 

  //const [injury, setInjury] = React.useState({})

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInjuryChange = (event) => {
    var localInjury = {...injury}
    console.log("event target   ",event.target);
    if(event.target.checked){
      Object.entries(injury).forEach(([key, value]) => {
        if(key != event.target.name){
          console.log("key", key);
          console.log("localInjury[key]", localInjury[key]);
          console.log("value", value);
          localInjury[key] = false;
        }else{
          localInjury[key] = true;
        }
      })
    }else{
      localInjury[event.target.name] = false;
    }

    console.log("localInjury", localInjury);

    setInjury({
      ...localInjury,
    });

  };

  const handleIsInjured = (event) => {
    setIsInjured(state => !state);
  };
  const { Condição_Clínica, Desnutrição_grave, Pequena_cirurgia_eletiva, Pós_operatório_geral_, Peritinote, Sepse, Infecção_grave, Câncer, Traumatismo_de_tecidos_moles, Fraturas_múltiplas, Queimadura_até_20, Queimadura_20_a_40, Queimadura_até_40_a_100 } = injury;
  
  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      
        {!isInjured ? <>
        <FormLabel component="legend">Paciente está Doente ou ferido?</FormLabel>
        <FormGroup >
          <FormControlLabel
            control={
              <Checkbox checked={isInjured} onChange={handleIsInjured} name="isInjured" />
            }
            label="Sim"
          />
          </FormGroup></>
        :<>
        <FormLabel component="legend">Qual?</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={Condição_Clínica} onChange={handleInjuryChange} name="Condição_Clínica" />
            }
            label="Condição Clínica"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Desnutrição_grave} onChange={handleInjuryChange} name="Desnutrição_grave" />
            }
            label="Desnutrição grave"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Pequena_cirurgia_eletiva} onChange={handleInjuryChange} name="Pequena_cirurgia_eletiva" />
            }
            label="Pequena cirurgia eletiva"
          />
        </FormGroup>
        </>}
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
{/*       <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl> */}
      
    </Box>
  );
}