import * as React from 'react'
import { FieldProps } from 'formik'
import { Form, Input } from 'antd'

export const InputField: React.SFC<
  FieldProps<any> & { prefix: React.ReactNode }
> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name]

  return (
    <Form.Item help={errorMsg} validateStatus={errorMsg ? 'error' : undefined}>
      <Input {...field} {...props} />
    </Form.Item>
  )
}
