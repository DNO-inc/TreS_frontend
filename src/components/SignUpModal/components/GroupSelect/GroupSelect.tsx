import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";

import { Loader } from "../../../Loader";

import { useGetGroupsQuery } from "../../../../store/api/api";
import { InputLabel, useTheme } from "@mui/material";
import IPalette from "../../../../theme/IPalette.interface";

interface GroupSelectProps {
  group: number | null;
  setGroup: Dispatch<SetStateAction<number | null>>;
  isError: boolean;
}

interface group {
  group_id: number;
  name: string;
}

const GroupSelect: FC<GroupSelectProps> = ({ group, setGroup, isError }) => {
  const { palette }: IPalette = useTheme();
  const { t } = useTranslation();
  const { data, isLoading, isSuccess } = useGetGroupsQuery({});

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedGroup: number = parseInt(event.target.value);

    setGroup(selectedGroup);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl
        fullWidth
        error={isError}
        required
        sx={{ "& .MuiSelect-select": { p: "12px 32px 12px 14px" } }}
      >
        {isLoading && <Loader size="small" />}
        {isSuccess && (
          <>
            <InputLabel htmlFor="group-select-label">
              {t("common.group")}
            </InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              value={group ? group.toString() : "2"}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value={"-1"} disabled>
                <ListItemText
                  primary={t("common.selectGroup")}
                  primaryTypographyProps={{
                    style: { color: palette.whiteAlpha.default },
                  }}
                />
              </MenuItem>
              {data.groups_list.map((group: group) => (
                <MenuItem
                  value={group.group_id}
                  key={`menuItem-${group.group_id}`}
                >
                  <ListItemText primary={group.name} />
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </FormControl>
    </Box>
  );
};

export { GroupSelect };
