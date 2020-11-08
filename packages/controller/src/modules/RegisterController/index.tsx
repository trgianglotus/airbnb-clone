import { gql, useMutation } from '@apollo/client'

const REGISTER = gql`
  mutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`

interface Props {
  children: (data: {
    submit: (values: any) => Promise<null>
  }) => JSX.Element | null
}

export const RegisterController = (props: Props) => {
  const [register] = useMutation(REGISTER)

  const { children } = props

  const submit = async (values: any) => {
    console.log(values)
    const response = await register({ variables: values })
    console.log(response)
    return null
  }

  return children({ submit })
}
