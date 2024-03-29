import { MIN_PASSWORD_LENGTH } from '$lib/constants/auth';
import { z } from 'zod';

export interface IUserSignInData {
  email: string;
  password: string;
}

export interface INewUserData extends IUserSignInData {
  confirmedPassword: string;
}

export interface IUpdateUserSettingsData {
  defaultServingSize: number;
}

const passwordError = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*(),.?":{}|<>)`;

export const newUserSchema = z.object({
  email: z.string({
    required_error: 'Email is required.',
    invalid_type_error: 'Email must be a string.',
  })
    .email({ message: 'Invalid email address.' }),
  password: z.string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  })
    .min(MIN_PASSWORD_LENGTH, { message: passwordError })
    .regex(/\d/, { message: passwordError })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: passwordError })
    .regex(/[A-Z]/, { message: passwordError })
    .regex(/[a-z]/, { message: passwordError }),
  confirmedPassword: z.string({
    required_error: 'You must confirmed your password.',
    invalid_type_error: 'Password confirmation must be a string.',
  }),
});

export const signInSchema = z.object({
  email: z.string({
    required_error: 'Email is required.',
    invalid_type_error: 'Email must be a string.',
  })
    .email({ message: 'Invalid email address.' }),
  password: z.string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  })
});

export const userSettingsSchema = z.object({
  defaultServingSize: z.preprocess(
    (x) => parseInt(z.string().parse(x), 10),
    z.number({
      invalid_type_error: 'Default serving size must be a number.',
    })
      .positive()
      .min(1, { message: 'Default servings must be 0 or greater.' })
  ),
});