import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';

import { RecaptchaAction } from '@graasp/sdk';

import { useNavigate } from '@tanstack/react-router';

import { NS } from '@/config/constants';

import { mutations } from '../../config/queryClient';
import {
  MAGIC_LINK_EMAIL_FIELD_ID,
  SIGN_IN_BUTTON_ID,
} from '../../config/selectors';
import { useRecaptcha } from '../../context/RecaptchaContext';
import { useMobileAppLogin } from '../../hooks/mobile';
import { AUTH } from '../../langs/constants';
import { getValidationMessage, isEmailValid } from '../../utils/validation';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { EmailInput } from './EmailInput';

const { SIGN_IN_BUTTON } = AUTH;

type Inputs = {
  email: string;
};

type MagicLinkLoginFormProps = {
  search: {
    url?: string;
  };
};

export function MagicLinkLoginForm({ search }: MagicLinkLoginFormProps) {
  const navigate = useNavigate();
  const { t } = useTranslation(NS.Auth);

  const { executeCaptcha } = useRecaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { isMobile, challenge } = useMobileAppLogin();

  const {
    mutateAsync: signIn,
    isPending: isLoadingSignIn,
    error: webSignInError,
  } = mutations.useSignIn();
  const {
    mutateAsync: mobileSignIn,
    isPending: isLoadingMobileSignIn,
    error: mobileSignInError,
  } = mutations.useMobileSignIn();

  const signInError = webSignInError || mobileSignInError;

  const handleSignIn = async ({ email }: Inputs) => {
    const lowercaseEmail = email.toLowerCase();

    try {
      const token = await executeCaptcha(
        isMobile ? RecaptchaAction.SignInMobile : RecaptchaAction.SignIn,
      );
      await (isMobile
        ? mobileSignIn({ email: lowercaseEmail, captcha: token, challenge })
        : signIn({
            email: lowercaseEmail,
            captcha: token,
            url: search.url,
          }));

      // navigate to success path
      navigate({
        to: '/auth/login/success',
        search: { email },
      });
    } catch (e) {
      console.error(e);
    }
  };
  const emailError = getValidationMessage(errors.email);

  return (
    <Stack
      component="form"
      direction="column"
      spacing={1}
      alignItems="center"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <EmailInput
        id={MAGIC_LINK_EMAIL_FIELD_ID}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        form={register('email', {
          required: true,
          validate: {
            email: (value) => isEmailValid(value) || 'INVALID_EMAIL_ERROR',
          },
        })}
        placeholder={t(AUTH.EMAIL_INPUT_PLACEHOLDER)}
        error={emailError}
      />
      <ErrorDisplay error={signInError} />
      <LoadingButton
        type="submit"
        id={SIGN_IN_BUTTON_ID}
        variant="contained"
        sx={{ textTransform: 'none' }}
        fullWidth
        loading={isLoadingMobileSignIn || isLoadingSignIn}
      >
        {t(SIGN_IN_BUTTON)}
      </LoadingButton>
    </Stack>
  );
}