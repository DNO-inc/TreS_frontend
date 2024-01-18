import { ForwardRefExoticComponent, RefAttributes, forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { TFunction } from "i18next";

import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import IPalette from "theme/IPalette.interface";
import { endpoints } from "constants";
import { useFormatDate } from "hooks/index";

export type IAction = {
  color: string;
  nick: string;
  action_id: string;
  author: {
    user_id: number;
    firstname: string;
    lastname: string;
    login: string;
    faculty: { faculty_id: number; name: string };
    group: { group_id: number; name: string };
  };
  creation_date: string;
  field_name: string;
  file_meta_action: string;
  new_value: string;
  old_value: string;
  value: string;
  ticket_id: number;
  type_: "action";
};

interface ActionProps {
  action: IAction;
  translator: TFunction<"translation", undefined, "translation">;
  lang: string;
}

const Action: ForwardRefExoticComponent<
  Omit<ActionProps, "ref"> & RefAttributes<HTMLDivElement>
> = forwardRef(({ action, translator: translator, lang }, ref) => {
  const { palette }: IPalette = useTheme();

  const formattedDate: string = useFormatDate(action.creation_date, "full");

  const getActionText = () => {
    if (lang === "ua") {
      return (
        <>
          {action.field_name === "file" ? (
            action.file_meta_action === "upload" ? (
              <>{` ${formattedDate} завантажив(-ла) файл ${action.value}`}</>
            ) : (
              <>{` ${formattedDate} видалив(-ла) файл ${action.value}`}</>
            )
          ) : (
            <>
              {` ${formattedDate} змінив ${translator(
                `fullTicket.comments.${action.field_name}`
              )} з `}
              {action.field_name === "status" ? (
                <>
                  <Box component={"span"}>
                    {translator(
                      `ticketStatus.${action.old_value.toLowerCase()}`
                    )}
                  </Box>
                  {` на `}
                  <Box component={"span"}>
                    {translator(
                      `ticketStatus.${action.new_value.toLowerCase()}`
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <Box component={"span"}>{action.old_value}</Box>
                  {` на `}
                  <Box component={"span"}>{action.new_value}</Box>
                </>
              )}
            </>
          )}
        </>
      );
    }

    return (
      <>
        {action.field_name === "file" ? (
          <>{` on ${formattedDate} has ${action.file_meta_action} a file ${action.value}`}</>
        ) : (
          <>
            {` on ${formattedDate} changed the ${action.field_name} from `}
            <Box component={"span"}>{action.old_value}</Box>
            {` to `}
            <Box component={"span"}>{action.new_value}</Box>
          </>
        )}
      </>
    );
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: palette.grey.border,
          p: "4px 16px",
          borderRadius: 5,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
            <NavLink
              to={`${endpoints.PROFILE}/${action.author.user_id}`}
              style={{ color: action.color, fontWeight: 600 }}
            >
              {action.nick}
            </NavLink>
            {getActionText()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export { Action };
