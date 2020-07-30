import React, {useEffect, useState} from 'react'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {InputBase} from 'formik-material-ui'
import {Button, ClickAwayListener, Divider, Fade, MenuItem, Paper, Popper} from '@material-ui/core'
import {useHistory, useLocation} from 'react-router-dom'
import {debounce} from 'lodash'
import s from './Users.module.scss'
import SearchIcon from '@material-ui/icons/Search'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import {UsersFilter} from './UsersFilter'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

let InitialValues: any = {
    username: '',
    friends: 'none' as 'none' | 'true' | 'false',
    min_age: 0,
    max_age: 0
}


type FormType = typeof InitialValues

let intervalID: any

type PropsType = {
    getUsers: (page: number, query: string) => void
    page: number
}

const UsersSearch: React.FC<PropsType> = React.memo(({page, getUsers}) => {

        let history = useHistory()
        let query = useQuery()
        let [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
        let values = {...InitialValues}
        let [queryString, setQueryString] = useState(query.toString())

        const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault()
            setAnchorEl(anchorEl ? null : event.currentTarget)
        }

        const handleAwayClick = () => {
            setAnchorEl(null)
        }

        const open = Boolean(anchorEl)
        const id = open ? 'users_filter' : undefined

        for (let [key, value] of query.entries()) {
            if (value) {
                values[key] = value
            }
        }

        const setAges = (method: string) => {
            let ages = []
            ages.push(<MenuItem key={0} value={0}>{method}</MenuItem>)
            for (let i = method === 'From' ? 9 : 10; i < (method === "From" ? 80 : 81); i++) {
                ages.push(
                    <MenuItem key={i} value={i}>{method + ' ' + i}</MenuItem>
                )
            }

            return ages
        }


        useEffect(() => {
            getUsers(page, queryString)
        }, [page, queryString])

        const handleSubmit = (values: FormType, {setSubmitting}: FormikHelpers<FormType>) => {
            setSubmitting(false)
            for (let [key, value] of Object.entries(values)) {
                if (value && value !== 'none')
                    query.set(key, value as string)
                else
                    query.delete(key)
            }
            history.push(`/users?${query.toString()}`)

            console.log(query.toString())
            console.log(values)
            setQueryString(query.toString())
        }


        return (
            <Formik
                initialValues={values}
                /*validate={values => {
                    const errors: Partial<Values> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}*/
                onSubmit={handleSubmit}
            >
                {({submitForm, isSubmitting, handleChange}) => (
                    <Form>
                        <Paper className={s.search}>
                            <SearchIcon className={s.icon}/>
                            <Divider orientation="vertical" flexItem/>
                            <Field

                                className={s.input}
                                placeholder="Search"
                                component={InputBase}
                                name="username"
                                type="text"
                                onKeyDown={debounce(() => {
                                    clearInterval(intervalID)
                                    intervalID = setTimeout(() => {
                                        submitForm()
                                    }, 2000)
                                }, 50)
                                }
                            />
                            <Divider orientation="vertical" flexItem/>
                            <Button type="button" aria-describedby={id} onClick={handleFilterClick}
                                    color={'primary'}> Parameters <ArrowDropDownIcon/></Button>
                            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                                {({TransitionProps}) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper className={s.filter}>
                                            <UsersFilter handleChange={(e: any) => {
                                                handleChange(e)
                                                submitForm()
                                            }} ages={setAges('From')} ages1={setAges('To')}/>
                                        </Paper>
                                    </Fade>
                                )}

                            </Popper>
                        </Paper>
                    </Form>
                )}
            </Formik>
        )
    }
)

export default UsersSearch