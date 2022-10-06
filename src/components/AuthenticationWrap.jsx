// Importing Authentication Dependencies
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { useTheme, View, Image, Text, Heading, Button, useAuthenticator, CheckboxField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { APImethods } from '../api/APImethods';
import { GraphQLEnumType } from 'graphql/type';
import { useState } from 'react';

function SubsidiumAuth(props) {

  // Components from {https://ui.docs.amplify.aws/react/connected-components/authenticator/customization}
  const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Subsidium logo"
            src="https://docs.amplify.aws/assets/logo-dark.svg"
          />
        </View>
      );
    },
  
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Ingrese a su cuenta
          </Heading>
        );
      },
      Footer() {
        const { toResetPassword } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toResetPassword}
              size="small"
              variation="link"
            >
              Recuperar Contraseña
            </Button>
          </View>
        );
      },
    },
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Registrese en Subsidium
          </Heading>
        );
      },
      FormFields() {
        const { validationErrors } = useAuthenticator();

        return (
          <>
            <Authenticator.SignUp.FormFields />
            <CheckboxField
              errorMessage={validationErrors.acknowledgement}
              hasError={!!validationErrors.acknowledgement}
              name="acknowledgement"
              value="yes"
              label="I agree with the Terms & Conditions"
            />
          </>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Regresar a Inicio de Sesion
            </Button>
          </View>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    SetupTOTP: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Ingrese su Información:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  };
  // FormFields from {https://ui.docs.amplify.aws/react/connected-components/authenticator/customization}
  const formFields = {
    signIn: {
      username: {
        labelHidden: false,
        placeholder: 'Enter your email',
      },
    },
    signUp: {
      password: {
        labelHidden: false,
        label: 'Password:',
        placeholder: 'Enter your Password:',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        labelHidden: false,
        label: 'Confirm Password:',
        order: 1,
      },
    },
    forceNewPassword: {
      password: {
        labelHidden: false,
        placeholder: 'Enter your Password:',
      },
    },
    resetPassword: {
      username: {
        labelHidden: false,
        placeholder: 'Enter your email:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        labelHidden: false,
        placeholder: 'Enter your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        labelHidden: false,
        placeholder: 'Enter your Password Please:',
      },
    },
    setupTOTP: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        labelHidden: false,
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        labelHidden: false,
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
  // Overiding Signup to create User
  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      // custom username
      console.log(username)
      console.log(attributes)
      APImethods.createUser(username, attributes.name, attributes.familyName, attributes.email, GraphQLEnumType("USER"), false, true);
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
    async validateCustomSignUp(formData) {
      if (!formData.acknowledgement) {
        return {
          acknowledgement: 'You must agree to the Terms & Conditions',
        };
      }
    },
  };

  return (
    <Authenticator services={services} components={components}>
      {props.jsx}
    </Authenticator>
  )
}

export default SubsidiumAuth