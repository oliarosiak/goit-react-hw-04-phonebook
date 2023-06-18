import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { GiWhiteBook } from 'react-icons/gi';
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormBtm,
} from './ContactForm.styled';

const ContactForm = ({ onSubmit }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().min(5).max(16).required(),
    // number: yup.number().min(5).max(16).required(),
  });

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormContainer autoComplete="off">
        <FormLabel htmlFor="name">
          Muggle Name
          <FormInput type="text" name="name" />
        </FormLabel>
        <FormLabel htmlFor="number">
          Not a Magic Number
          <FormInput type="tel" name="number" />
        </FormLabel>
        <FormBtm type="submit">
          <GiWhiteBook /> Lumos Contact!
        </FormBtm>
      </FormContainer>
    </Formik>
  );
};

ContactForm.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
