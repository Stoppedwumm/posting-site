import { encrypt } from '@vercel/flags';
import { FlagValues } from '@vercel/flags/react';

export async function ConfidentialFlagValues({ values, secret }) {
  const encryptedFlagValues = await encrypt(values);
  return <FlagValues values={encryptedFlagValues} />;
}