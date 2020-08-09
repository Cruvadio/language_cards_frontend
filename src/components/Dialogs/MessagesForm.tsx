import React from 'react'
import {Form, Input} from 'formik-antd'
import {Formik, FormikHelpers} from 'formik'
import {Button} from 'antd'
import {SendMessageType} from '../../types/global'
import {useDispatch} from 'react-redux'

type Props = {
    sendMessage: (message: SendMessageType, dialogID: number,  formikHelpers: FormikHelpers<SendMessageType>) => void
    currentDialog: number
}

export const MessagesForm : React.FC<Props> = ({sendMessage, currentDialog}) => {
    const dispatch = useDispatch()

    return (
        <div>
            <Formik
                initialValues={{text: ''}}
                onSubmit={
                    (values, formikHelpers) => {
                        console.log(values)
                        dispatch(sendMessage(values, currentDialog, formikHelpers))
                    }
                }
            >
                {props => (
                    <Form>
                        <Input.TextArea name={'text'} rows={4} allowClear onPressEnter={(e) => {
                            e.preventDefault()
                            props.submitForm()
                        }} />
                        <Button type='primary' onClick={props.submitForm}>Send</Button>
                    </Form>
                )}

            </Formik>
        </div>
    )
}