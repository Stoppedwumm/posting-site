import { FlagOverridesType, decrypt } from '@vercel/flags';
import { cookies } from 'next/headers';
 
export async function getFlags(request) {
  const overrideCookie = cookies().get('vercel-flag-overrides')?.value;
  const overrides = overrideCookie ? await decrypt(overrideCookie) : {};
 
  const flags = {
    exampleFlag: overrides?.exampleFlag ?? false,
  };
 
  return flags;
}