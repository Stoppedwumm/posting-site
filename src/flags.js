import {unstable_flag as flag} from '@vercel/flags/next'

export const newFeature = flag({
    key: 'newFeature',
    description: 'Controls whether the new feature is visible',
    decide: async () => false,
    defaultValue: false
})