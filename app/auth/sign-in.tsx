import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { z } from 'zod';

import LOGOFB from '~/assets/images/facebook.svg';
import LOGOGOOGLE from '~/assets/images/google.svg';
import { ControllerInput } from '~/components/molecules/ControllerInput';
import { NavigationBar } from '~/components/molecules/NavigationBar';
import { Button } from '~/components/ui/button';
import { useSignIn } from '~/hooks/react-query/useAuth';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInFormField = z.infer<typeof schema>;

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormField>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation('auth');

  const signInMutation = useSignIn();

  const onSubmit: SubmitHandler<SignInFormField> = async (data) => {
    signInMutation.mutate(data);
  };

  return (
    <View className='h-screen'>
      <NavigationBar title={t('signIn.welcomeBack')} />

      <View className='bg-background grow w-full px-4 pb-8 flex-col justify-between items-center inline-flex'>
        <Text className='w-full text-neutral-500 font-normal text-callout'>{t('signIn.enterDetails')}</Text>
        <View className='gap-y-20'>
          <View className='flex gap-y-4'>
            <ControllerInput
              props={{ name: 'email', control }}
              label={t('signIn.email')}
              placeholder={t('signIn.emailPlaceholder')}
              error={errors.email}
            />

            <ControllerInput
              props={{ name: 'password', control }}
              label={t('signIn.password')}
              placeholder={t('signIn.passwordPlaceholder')}
              error={errors.password}
            />

            <View className='flex flex-row justify-end'>
              <Link push href='/auth/(forgot-password)'>
                <Text className='text-orange-500 text-subhead font-medium'>{t('signIn.forgotPassword')}</Text>
              </Link>
            </View>
          </View>

          <View className='gap-y-6'>
            <Button
              className='w-full bg-orange-500 shadow-button shadow-orange-700 py-3.5 px-5 rounded-none'
              onPress={handleSubmit(onSubmit)}
              size={'lg'}
              disabled={signInMutation.isPending}>
              <Text className='text-white text-body font-semibold'>{t('signIn.signIn')}</Text>
            </Button>
            <View className='flex flex-col justify-center items-center gap-y-[7px]'>
              <Text className='text-supporting-text text-subhead font-medium'>{t('signIn.orSignInWith')}</Text>
              <OtherSignIn />
            </View>
          </View>
        </View>
        <View className='flex flex-row justify-center items-center gap-x-2.5'>
          <Text className='text-neutral-900 text-footnote'>{t('signIn.noAccount')}</Text>
          <Link push href='/auth/sign-up'>
            <Text className='text-orange-500 text-footnote font-medium'>{t('signIn.signUp')}</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

function OtherSignIn() {
  return (
    <View className='flex flex-row justify-center items-center gap-x-[35px]'>
      <LOGOFB onPress={() => {}} width={32} height={32} />
      <LOGOGOOGLE onPress={() => {}} width={32} height={32} />
    </View>
  );
}
