import { Form as FormStrap, FormProps as FormStrapProps } from 'reactstrap';

interface FormProps extends FormStrapProps {

}

export function Form(props: FormProps) {
  return <FormStrap {...props} />
}