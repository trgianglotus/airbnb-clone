import React from 'react'
import * as Antd from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { FormikErrors, withFormik, FormikProps, Field, Form } from 'formik'
import { validUserSchema } from '@abb/common'
import { InputField } from '../shared/inputField'

interface FormValues {
  email: string
  password: string
}

const { Form: AntForm, Button } = Antd

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues | null>>
}

const C = (props: Props & FormikProps<FormValues>) => {
  return (
    <div style={{ width: 400, margin: 'auto' }}>
      <Form name="normal_login" className="login-form">
        <Field
          name="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          component={InputField}
          type="email"
        />

        <Field
          name="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          component={InputField}
          type="password"
        />

        <AntForm.Item>
          <a className="login-form-forgot" href="/forgot-password">
            Forgot password
          </a>
        </AntForm.Item>

        <AntForm.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </AntForm.Item>
        <AntForm.Item>
          Or <a href="/login">login now!</a>
        </AntForm.Item>
      </Form>
    </div>
  )
}

const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  validateOnChange: false,
  mapPropsToValues: (props) => ({
    email: '',
    password: '',
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values)
    if (errors) {
      setErrors(errors)
    }
  },
})(C)

export default RegisterView
