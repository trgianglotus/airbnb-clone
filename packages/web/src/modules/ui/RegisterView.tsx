import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { FormikErrors, withFormik, FormikProps } from 'formik'
import yup from 'yup'

interface FormValues {
  email: string
  password: string
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues | null>>
}

const C = (props: Props & FormikProps<FormValues>) => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = props

  return (
    <div style={{ width: 400, margin: 'auto' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          rules={[{ required: true, message: 'Please input your Email!' }]}
          help={touched.email && errors.email ? errors.email : null}
          validateStatus={touched.email && errors.email ? 'error' : 'success'}
        >
          <Input
            type="email"
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Please input your Password!' }]}
          help={touched.password && errors.password ? errors.password : null}
          validateStatus={
            touched.password && errors.password ? 'error' : 'success'
          }
        >
          <Input
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="/forgot-password">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          Or <a href="/login">login now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}

export const duplicateEmail = 'already taken'
export const emailNotLongEnough = 'email must be at least 3 characters'
export const passwordNotLongEnough = 'password must be at least 3 characters'
export const invalidEmail = 'email must be a valid email'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: yup.string().min(3, passwordNotLongEnough).max(255).required(),
})

const RegisterView = withFormik<Props, FormValues>({
  validationSchema,
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
