import React from "react"
import {Select, TextField} from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import Chip from "@material-ui/core/Chip"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import {WrappedFieldProps} from "redux-form"
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";


const AddError = (Element: React.FC<any>): React.FC<WrappedFieldProps> => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (hasError ? <Element error helperText={hasError}{...input} {...props}/> :
            <Element {...input}{...props} />
    )
}


type PropsType = {
    objects: Array<string>
    labelID: string
}

export const SelectInput: React.FC<WrappedFieldProps & PropsType> = ({
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
                onChange={onChange}
                value={value}
                input={<Input/>}
                renderValue={((selected: any) => (
                    <div>
                        {selected.map((v: string) => (
                            <Chip key={v} label={v} onDelete={() => {
                                onChange(value.filter((i: string) => i !== v))
                            }
                            }/>
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


export const DateField: React.FC<WrappedFieldProps> = ({
                                                           input: {onChange, ...input}, meta: {touched, error}, ...props
                                                       }) => {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                variant={"inline"}
                format="dd/MM/yyyy"
                onChange={(date: MaterialUiPickersDate, value?: string | null | undefined) => {
                    return (date && onChange(date.toJSON().split("T")[0]))
                }}
                {...input}
                {...props}
            />
        </MuiPickersUtilsProvider>
    )

}

export const Textarea = AddError(TextField);