import React, { useCallback }from 'react';
import {
  SimpleForm,
  ImageInput,
  TextInput,
  required,
  SelectInput,
  FormDataConsumer,
  RadioButtonGroupInput, useTranslate,
} from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/field-components';
import { ReferenceInput } from '@semapps/input-components';
import { DateTimeInput } from '@semapps/date-components';
import frLocale from 'date-fns/locale/fr';
import BodyLabel from '../commons/lists/BodyLabel';
import { currencies } from '../config/constants';
import { useHistory } from 'react-router-dom';
import { Toolbar, Button, makeStyles, Box, Typography, Container, Card } from '@material-ui/core';



const futureDate = (value) => {
  if (value && value <= new Date()) {
    return 'app.validation.futureDate';
  }
};

const dateTimeInputProps = {
  options: {
    format: 'dd/MM/yyyy à HH:mm',
    ampm: false,
    clearable: true,
  },
  providerOptions: {
    locale: frLocale,
  },
  fullWidth: true,
  allowClear: true,
};

const TypeCondition = ({ type, children, className, ...rest }) => (
  <FormDataConsumer subscription={{ values: true }}>
    {({ formData, ...rest2 }) =>
      (Array.isArray(type)
        ? type.includes(formData.type) || type.includes(formData['@type'])
        : formData.type === type || formData['@type'] === type) &&
      React.Children.map(children, (child) => React.cloneElement(child, rest))
    }
  </FormDataConsumer>
);


const Form = (props) => {
  const translate = useTranslate();
  const history = useHistory();

  const redirect = (basePath, id, data) => `/filter/${encodeURIComponent(id)}`;

  return (
    <SimpleForm {...props} redirect={redirect}>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
      <ImageInput source="pair:depictedBy" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <ReferenceInput reference="Location" source="as:location" fullWidth>
        <SelectInput optionText="vcard:given-name" />
      </ReferenceInput>
      {/* <TypeCondition type="mp:LoanRequest">
        <BodyLabel>{translate('app.conditions.borrowing')}</BodyLabel>
        <TextInput source="mp:hasTimeCondition.mp:minDuration" fullWidth />
      </TypeCondition> */}
      <BodyLabel>{translate('app.conditions.other')}</BodyLabel>
      <DateTimeInput source="mp:hasTimeCondition.mp:expirationDate" validate={[futureDate]} {...dateTimeInputProps} />
    </SimpleForm>
  );
};

export default Form;
