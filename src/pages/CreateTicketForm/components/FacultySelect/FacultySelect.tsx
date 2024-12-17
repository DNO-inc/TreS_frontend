import { FC, memo } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

import { Loader } from 'components/Loader'

import { useGetFacultiesQuery } from 'api/meta.api'
import { createFormKeys } from 'constants/index'
import IPalette from 'theme/IPalette.interface'

interface FacultySelectProps {
  facultyId: number
  register: UseFormRegister<ICreateTicketRequestBody>
  setValue: UseFormSetValue<ICreateTicketRequestBody>
}

interface IFaculty {
  faculty_id: number
  name: string
}

const FacultySelect: FC<FacultySelectProps> = memo(
  ({ facultyId, register, setValue }) => {
    const { t } = useTranslation()
    const { palette }: IPalette = useTheme()

    const { data, isLoading, isSuccess } = useGetFacultiesQuery({})

    const handleChange = (event: SelectChangeEvent) => {
      const selectedFaculty = parseInt(event.target.value)
      setValue(createFormKeys.FACULTY, selectedFaculty)
    }

    return (
      <Box
        sx={{
          width: {
            xs: '100%',
            md: 'calc(100% / 2 - 12px)',
            xl: 'calc(100% / 3 - 16px)',
          },
        }}
      >
        <Typography variant='h3'>{t('createTicket.faculty')}</Typography>
        <FormControl
          size='small'
          fullWidth
          sx={{ bgcolor: palette.grey.card }}
          {...register(createFormKeys.FACULTY)}
        >
          {isLoading && <Loader size='small' />}
          {isSuccess && (
            <Select
              id='faculty-select'
              value={facultyId.toString()}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {data.faculties_list.map((faculty: IFaculty) => (
                <MenuItem
                  value={faculty.faculty_id.toString()}
                  key={`menuItem-${faculty.faculty_id}`}
                >
                  <ListItemText primary={faculty.name} />
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </Box>
    )
  }
)

export { FacultySelect }
