import React, { useState } from 'react';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import grey from '@material-ui/core/colors/grey';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import appConfig from '../config.json';

const useStyles = makeStyles( theme => ({
  container: {
    width: "100%",
    display: "flex",
    border: '0',
    margin: '0',
    padding: '0',
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    minHeight: 20,
    borderRadius: '5px',
    width: "50%",
    resize: 'none',
    padding: '6px 8px',
    marginRight: '12px',
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    border: `1px solid ${appConfig.theme.colors.neutrals[500]}`,
    color: appConfig.theme.colors.neutrals[200],
    //backgroundColor: appConfig.theme.colors.neutrals[700],
  },
  selectdisabled: {
    color: appConfig.theme.colors.neutrals[200],
  },
  menuitem: {
    direction: "ltl",
  },
  menuitemhidden: {
    display: "none"
  },
})); 

const PlaceholderSelect = () => {
    const classes = useStyles();
    const [value, setValue] = useState("none");
    const [gravidade, setGravidade] = useState("none");
    const [showPlaceholder, setShowPlaceholder] = useState(value === "none");
    return (
        <div className={classes.container} >
            <Select
                value={value}
                defaultValue="none"
                input={<InputBase />}
                onChange={(e) => setValue(e.target.value)}
                onFocus={(e) => setShowPlaceholder(false)}
                onClose={(e) => setShowPlaceholder(e.target.value === undefined)}
                className={clsx(classes.select, value === "none" ? classes.selectdisabled : null)}
            >
                <MenuItem className={clsx(classes.menuitem, !showPlaceholder ? classes.menuitemhidden : null)} key="0" disabled value="none" >Condição clínica.</MenuItem>
                <MenuItem className={classes.menuitem} key="1" value="1" >1</MenuItem>
                <MenuItem className={classes.menuitem} key="2" value="2" >2</MenuItem>
                <MenuItem className={classes.menuitem} key="3" value="3" >3</MenuItem>
            </Select>
            <Select
                value={gravidade}
                defaultValue="none"
                input={<InputBase />}
                onChange={(e) => setGravidade(e.target.value)}
                onFocus={(e) => setShowPlaceholder(false)}
                onClose={(e) => setShowPlaceholder(e.target.value === undefined)}
                className={clsx(classes.select, value === "none" ? classes.selectdisabled : null)}
            >
                <MenuItem className={clsx(classes.menuitem, !showPlaceholder ? classes.menuitemhidden : null)} key="0" disabled value="none" >Gravidade.</MenuItem>
                <MenuItem className={classes.menuitem} key="1" value="leve" >leve</MenuItem>
                <MenuItem className={classes.menuitem} key="2" value="grave" >grave</MenuItem>
            </Select>
        </div>
    );
}

export default PlaceholderSelect;