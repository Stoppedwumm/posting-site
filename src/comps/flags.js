"use server"
import { encrypt } from '@vercel/flags';
import { FlagValues } from '@vercel/flags/react';
 
export async function ConfidentialFlagValues({ values }) {
  const encryptedFlagValues = await encrypt(values);
  return <FlagValues values={encryptedFlagValues} />;
}