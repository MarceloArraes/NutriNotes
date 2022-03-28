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
  const [objBodyParts, setObjBodyParts] = useState({
    obs:[
    {"id":"1","name":"Braço Esquerdo", "value": false, "children1": [
      {"id":"2","name":"Ombro Esquerdo", "value": false, "percentil": 2.7},
      {"id":"3","name":"Antebraço Esquerdo", "value": false, "percentil": 1.6},
      {"id":"4","name":"Mão Esquerda", "value": false, "percentil": 0.7},
    ]
    },
    {"id":"5","name":"Braço Direito", "value": false, "children1": [
      {"id":"6","name":"Ombro Direito", "value": false, "percentil": 2.7},
      {"id":"7","name":"Antebraço Direito", "value": false, "percentil": 1.6},
      {"id":"8","name":"Mão Direita", "value": false, "percentil": 0.7},
    ],
    },
    {"id":"9","name":"Perna Esquerda", "value": false, "children1": [
      {"id":"10","name":"Coxa Esquerda", "value": false, "percentil": 10.1},
      {"id":"11","name":"Canela Esquerda", "value": false, "percentil": 4.4},
      {"id":"12","name":"Pé Esquerdo", "value": false, "percentil": 1.5},
    ]
    },
    {"id":"13","name":"Perna Direita", "value": false, "children1": [
      {"id":"14","name":"Coxa Direita", "value": false, "percentil": 10.1},
      {"id":"15","name":"Canela Direita", "value": false, "percentil": 4.4},
      {"id":"16","name":"Pé Direito", "value": false, "percentil": 1.5},
    ]
    },
  ]
  })


  useEffect(() => {
    if(props.condicaoClinica!='' && props.level!=''){
      props.setFatorInjuria(injuries.injury[props.condicaoClinica][props.level]);
    }
  }, [props.condicaoClinica, props.level, props.fatorInjuria])

  useEffect(() => {
    console.log(props.condicaoClinica)
    var percentilAmputacao = 0.0;
    if(props.condicaoClinica==="Amputacao"){
     objBodyParts.obs.map(item => { item.children1.map(item2 => { item2.value? percentilAmputacao+=item2.percentil:null  }) });
    }
    console.log(percentilAmputacao)

  }, [objBodyParts])

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

  

  const handleChange4 = (event) => {
    console.log(event.target.value);
    
    let copyOfObject = { ...objBodyParts }

    if(event.target.name==="parent"){

      copyOfObject.obs.map(item => {item.id===event.target.id? item.children1.map(item2 => {  item2.value = event.target.checked  }) : null})
      setObjBodyParts(copyOfObject);

    }else{
    copyOfObject.obs.map(item => { item.children1.map(item2 => { item2.id === event.target.id ? item2.value = event.target.checked : null }) })
    setObjBodyParts(copyOfObject);
  }

  }

    function ListChildren(props){
      const parent = props.bodyParts;
      return (
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {parent.children1.map((item, index) => {
        return (
      <FormControlLabel
        key={item.id}
        label={item.name}
        control={<Checkbox id={item.id} checked={item.value} onChange={handleChange4} />}
      /> 
        )
      })}
    </Box>
    )
    }
    //Termina CheckBox Amputaçao

  const handleChange = (event) => {
    props.setCondicaoClinica(event.target.value);
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
                name="parent"
                id={bodyParts.id}
                checked={bodyParts.children1[0].value && bodyParts.children1[1].value && bodyParts.children1[2].value}
                indeterminate={bodyParts.children1[0].value !== bodyParts.children1[1].value || bodyParts.children1[0].value !== bodyParts.children1[2].value}
                onChange={handleChange4}
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