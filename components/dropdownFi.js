import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React,{useState, useEffect} from 'react';

/* function createData(condicaoclinica, leve, grave) {
  return { condicaoclinica, leve, grave };
} */

export default function  DropdownFi(props) {
  //const [resultingFactor, setResultingFactor] = useState('');

  useEffect(() => {
    if(props.condicaoClinica!='' && props.level!=''){
      props.setFatorInjuria(injuries.injury[props.condicaoClinica][props.level]);
    }

  }, [props.condicaoClinica, props.level, props.fatorInjuria])

  const injuries = {
    "injury":{
    Desnutrição_grave: [1.5, 1.5],
    Pequena_cirurgia_eletiva:[1.1, 1.2],
    Pós_operatório_geral: [1.2, 1.5],
    Peritinote: [1.2, 1.5],
    Sepse: [1.4, 1.8],
    Infecção_grave: [1.3, 1.35],
    Câncer: [1.1, 1.45],
    Traumatismo_de_tecidos_moles:[1.4, 1.7],
    Fraturas_múltiplas:[1.2, 1.35],
    Queimadura_até_20: [1, 1.5],
    Queimadura_20_a_40: [1.5, 1.85],
    Queimadura_até_40_a_100: [1.85, 2.05]},
  }; 
  
/*   const listaCondicaoClinica = [
    "Desnutrição_grave",
    "Pequena_cirurgia_eletiva",
    "Pós_operatório_geral",
    "Peritinote",
    "Sepse",
    "Infecção_grave",
    "Câncer",
    "Traumatismo_de_tecidos_moles",
    "Fraturas_múltiplas",
    "Queimadura_até_20",
    "Queimadura_20_a_40",
    "Queimadura_até_40_a_100",
  ] */
  const objCondicaoClinica2 = {
    obs:[
    {"name":"Desnutrição grave", "value": "Desnutrição_grave", "factor": [1.5, 1.5]},
    {"name":"Pequena cirurgia eletiva", "value": "Pequena_cirurgia_eletiva", "factor": [1.1, 1.2]},
    {"name":"Pós operatório geral", "value": "Pós_operatório_geral", "factor": [1.2, 1.5]},
    {"name":"Peritinote", "value": "Peritinote", "factor": [1.2, 1.5]},
    {"name":"Sepse", "value": "Sepse", "factor": [1.4, 1.8]},
    {"name":"Infecção grave", "value": "Infecção_grave", "factor": [1.3, 1.35]},
    {"name":"Câncer", "value": "Câncer", "factor": [1.1, 1.45]},
    {"name":"Traumatismo de tecidos moles", "value": "Traumatismo_de_tecidos_moles", "factor": [1.4, 1.7]},
    {"name":"Fraturas múltiplas", "value": "Fraturas_múltiplas", "factor": [1.2, 1.35]},
    {"name":"Queimadura até 20%", "value": "Queimadura_até_20", "factor": [1, 1.5]},
    {"name":"Queimadura 20% a 40%", "value": "Queimadura_20_a_40", "factor": [1.5, 1.85]},
    {"name":"Queimadura até 40% a 100%", "value": "Queimadura_até_40_a_100", "factor": [1.85, 2.05]}],
  }

  const handleChange = (event) => {
    props.setCondicaoClinica(event.target.value);
  };
  const handleChangeLevel = (event) => {
    props.setLevel(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Condição Clínica</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.condicaoClinica}
          label="Condição Clínica"
          onChange={handleChange}
        > 
          {objCondicaoClinica2.obs.map((condicaoClinica) => (
            <MenuItem key={condicaoClinica.name} value={condicaoClinica.value}>
              {condicaoClinica.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gravidade</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.level}
          label="Gravidade"
          onChange={handleChangeLevel}
        >
          <MenuItem value={"0"}>Leve</MenuItem>
          <MenuItem value={"1"}>Grave</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}