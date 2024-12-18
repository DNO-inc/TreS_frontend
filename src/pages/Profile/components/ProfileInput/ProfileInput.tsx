import { FC } from 'react'
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import TextField from '@mui/material/TextField'

import { profileFormKeys } from 'constants/index'
import { ProfileUpdateBody } from 'pages/Profile/Profile'

interface ProfileInputProps {
  register: UseFormRegister<FieldValues>
  defaultValue: string | undefined
  watch: UseFormWatch<ProfileUpdateBody>
  inputType: string
}

const ProfileInput: FC<ProfileInputProps> = ({
  register,
  defaultValue,
  watch,
  inputType,
}) => {
  const { t } = useTranslation()

  const profileKey = profileFormKeys[inputType.toUpperCase()]
  const value = watch(profileKey, defaultValue)
  const placeholder = t(`profile.editMode.${inputType}`)

  return (
    <TextField
      id={`profile-${inputType}`}
      placeholder={placeholder}
      value={value}
      variant='standard'
      fullWidth
      {...register(profileKey)}
      sx={{ maxWidth: 170 }}
    />
  )
}

export { ProfileInput }
