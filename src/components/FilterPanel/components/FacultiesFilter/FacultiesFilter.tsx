import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useTheme from '@mui/material/styles/useTheme'

import { useGetFacultiesQuery } from 'api/meta.api'
import { urlKeys } from 'constants/index'
import { useChangeURL } from 'hooks/index'
import IPalette from 'theme/IPalette.interface'

const FacultiesFilter: FC = () => {
  const { t } = useTranslation()
  const { palette }: IPalette = useTheme()

  const [searchParams] = useSearchParams()
  const putFacultyInURL = useChangeURL()
  const faculty = searchParams.get(urlKeys.FACULTY) || 'all'

  const { data, isSuccess } = useGetFacultiesQuery({})

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newFaculty = event.target.value

    putFacultyInURL(urlKeys.FACULTY, newFaculty, true)
  }

  return (
    <>
      {isSuccess && (
        <FormControl size='small' sx={{ bgcolor: palette.grey.card }}>
          <Select
            id='faculty-select'
            aria-label='faculty-select'
            value={faculty}
            onChange={handleChange}
            sx={{
              '.MuiInputBase-input': { pt: 1, pb: 1, width: 150 },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            <MenuItem aria-label='faculty-item' value='all'>
              <ListItemText primary={t('generalTickets.facultyFilter')} />
            </MenuItem>
            {data.faculties_list.map((faculty: IFaculty) => {
              return (
                <MenuItem
                  aria-label='faculty-item'
                  value={faculty.name}
                  key={faculty.faculty_id}
                >
                  <ListItemText primary={faculty.name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export { FacultiesFilter }
