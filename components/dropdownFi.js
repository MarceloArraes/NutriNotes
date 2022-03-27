import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React,{useState, useEffect} from 'react';
import appConfig from '../config.json';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

export default function  DropdownFi(props) {
  const [openAmputacao, setOpenAmputacao] = useState(false);
  const [checked, setChecked] = React.useState([true, false]);

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
    Queimadura_até_40_a_100: [1.85, 2.05],
    Amputacao: ['', ''],
  },
  }; 
  
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
    {"name":"Queimadura até 40% a 100%", "value": "Queimadura_até_40_a_100", "factor": [1.85, 2.05]},
    {"name":"Amputação", "value": "Amputacao", "factor": ['', '']},
  ],
  }

  const objBodyParts = {
    obs:[
    {"id":1,"name":"Braço Esquerdo", "value": "false", "children1": [
      {"id":2,"name":"Ombro Esquerdo", "value": false},
      {"id":3,"name":"Antebraço Esquerdo", "value": false},
      {"id":4,"name":"Mão Esquerda", "value": false},
    ]
    },
    {"id":5,"name":"Braço Direito", "value": false, "children1": [
      {"id":6,"name":"Ombro Direito", "value": false},
      {"id":7,"name":"Antebraço Direito", "value": false},
      {"id":8,"name":"Mão Direita", "value": false},
    ],
    },
    {"id":9,"name":"Perna Esquerda", "value": "false", "children1": [
      {"id":10,"name":"Coxa Esquerda", "value": false},
      {"id":11,"name":"Canela Esquerda", "value": false},
      {"id":12,"name":"Pé Esquerdo", "value": false},
    ]
    },
    {"id":13,"name":"Perna Direita", "value": "false", "children1": [
      {"id":14,"name":"Coxa Direita", "value": false},
      {"id":15,"name":"Canela Direita", "value": false},
      {"id":16,"name":"Pé Direito", "value": false},
    ]
    },
  ]
  }

  //Começa CheckBox Amputaçao
  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Antebraço"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Mão"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

    function ListChildren(props){
      const parent = props.bodyParts;
      return (
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {parent.children1.map((item, index) => {
        console.log(item);
        console.log(item.name);
        return (
      <FormControlLabel
        key={item.id}
        label={item.name}
        control={<Checkbox checked={item.value} onChange={handleChange2} />}
      /> 
        )
      })}
    </Box>
    )
    }
    //Termina CheckBox Amputaçao

  const handleChange = (event) => {
    props.setCondicaoClinica(event.target.value);
    if(event.target.value=='Amputacao'){
      setOpenAmputacao(true);
    }
  };
  const handleChangeLevel = (event) => {
    props.setLevel(event.target.value);
  };

  return (
    <Box sx={{ 
      minWidth: 120 
    }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{
          fontWeight: 'bold',
        }}>Condição Clínica</InputLabel>
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
      {props.condicaoClinica!='Amputacao'?
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{
          fontWeight: 'bold',
        }}>Gravidade</InputLabel>
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
      :<Box>
        
        {objBodyParts.obs.map((bodyParts) => (
          <div key={bodyParts.id}>
          <FormControlLabel
            label={bodyParts.name}
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <ListChildren bodyParts={bodyParts}/>
          </div>
        ))}


        
        
        </Box>}
    </Box>
  );
}