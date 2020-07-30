import {FormControl, InputLabel, MenuItem, Typography} from '@material-ui/core'
import {Field} from 'formik'
import {Select} from 'formik-material-ui'
import React from 'react/index'
import s from './Users.module.scss'

export function UsersFilter(props: { handleChange: (e: any) => void, ages: any[], ages1: any[] }) {
    return (
        <div className={s.parameters}>
            <FormControl>
                <InputLabel htmlFor="show-friends">Show:</InputLabel>
                <Field
                    component={Select}
                    name="friends"
                    inputProps={{
                        id: 'show-friends'
                    }}
                    size="small"
                    onChange={props.handleChange}
                >
                    <MenuItem value={'none'}>All</MenuItem>
                    <MenuItem value={'true'}>Friends</MenuItem>
                    <MenuItem value={'false'}>Not friends</MenuItem>

                </Field>
            </FormControl>

            <InputLabel className={s.text}>Age</InputLabel>
            <div className={s.age}>
                <FormControl>
                    <Field
                        component={Select}
                        name="min_age"
                        size="small"
                        onChange={props.handleChange}
                    >
                        {props.ages}

                    </Field>
                </FormControl>

                <Typography className={s.text}>-</Typography>
                <FormControl>
                    <Field
                        component={Select}
                        name="max_age"
                        size="small"
                        onChange={props.handleChange}
                    >
                        {props.ages1}

                    </Field>
                </FormControl>
            </div>
        </div>
    )
}