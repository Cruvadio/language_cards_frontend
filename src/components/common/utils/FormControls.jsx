import React from "react";
import s from './FormControls.module.scss'
import {addClassName} from "./helpers/helpers";
import {Select, TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import {KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";


const AddError = Element => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (hasError ? <Element error helperText={hasError}{...input} {...props}/> :
            <Element {...input}{...props} />
    )
}



export const SelectInput = ({
                                input: {
                                    value, onChange
                                }, meta: {touched, error}, objects, labelID, ...props
                            }) => {
    const hasError = touched && error;
    return (
        <FormControl error={hasError}>
            <InputLabel id={labelID}>Languages</InputLabel>
            <Select
                labelId={labelID}
                multiple
                onChange={(e) => onChange(e.target.value)}
                value={value}
                input={<Input/>}
                renderValue={(selected => (
                    <div>
                        {selected.map(value => (
                            <Chip key={value} label={value}/>
                        ))}
                    </div>
                ))}
                {...props}
            >
                {objects.map((name) => {
                    return (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}


export const DateField = ({
                             input , meta: {touched, error}, objects, ...props
                          }) => {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                format="MM/dd/yyyy"
                {...input}
                {...props}
            />
        </MuiPickersUtilsProvider>
    )

}

export const Textarea = AddError(TextField);