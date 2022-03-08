import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React,{useState, useEffect} from 'react';

function createData(condicaoclinica, leve, grave) {
  return { condicaoclinica, leve, grave };
}

export default function  DropdownFi(props) {
  //const [resultingFactor, setResultingFactor] = useState('');
  const [condicaoClinica, setCondicaoClinica] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    console.log("condicaoClinica", condicaoClinica);
    console.log("level", level);
    if(condicaoClinica!='' && level!=''){
      console.log(injuries.injury[condicaoClinica][level]);
      props.setFatorInjuria(injuries.injury[condicaoClinica][level]);
    }

  }, [condicaoClinica, level])

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
  console.log("injuries", injuries);
  
  const listaCondicaoClinica = [
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
  ]

  const handleChange = (event) => {
    setCondicaoClinica(event.target.value);
  };
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Condição Clínica</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={condicaoClinica}
          label="Condição Clínica"
          onChange={handleChange}
        > 
          {listaCondicaoClinica.map((condicaoClinica) => (
            <MenuItem key={condicaoClinica} value={condicaoClinica}>
              {condicaoClinica}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gravidade</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
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