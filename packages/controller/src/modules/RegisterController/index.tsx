interface Props {
  children: (data: {
    submit: (values: any) => Promise<null>
  }) => JSX.Element | null
}

export const RegisterController = (props: Props) => {
  const { children } = props

  const submit = async (values: any) => {
    console.log(values)
    return null
  }

  return children({ submit })
}
