import { encrypt } from '@vercel/flags';
import { FlagValues } from '@vercel/flags/react';
 
export async function ConfidentialFlagValues({ values }) {
  const encryptedFlagValues = await encrypt(values, process.env.FLAGS_SECRET);
  return <FlagValues values={encryptedFlagValues} />;
}