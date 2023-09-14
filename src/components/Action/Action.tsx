import { ForwardRefExoticComponent, RefAttributes, forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { TFunction } from "i18next";


import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import IPalette from "../../theme/IPalette.interface";
import { endpoints } from "../../constants";
import useRandomNickColor from "../../shared/hooks/useRandomNickColor";
import { useFormatDate } from "../../shared/hooks";

export type IAction = {
  action_id: 1;
  author: {
    user_id: 2;
    firstname: string;
    lastname: string;
    login: string;
    faculty: { faculty_id: number; name: string };
    group: { group_id: number; name: string };
  };
  creation_date: string;
  field_name: string;
  new_value: string;
  old_value: string;
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

  const color = useRandomNickColor();
  const formattedDate: string = useFormatDate(action.creation_date, "date");


  const getActionText = () => {
    if (lang === "ua") {
      return (
        <>
          {` ${formattedDate} змінив ${translator(
            `fullTicket.comments.${action.field_name}`
          )} з `}
          {action.field_name === "status" ? (
            <>
              <Box component={"span"}>
                {translator(`ticketStatus.${action.old_value.toLowerCase()}`)}
              </Box>
              {` на `}
              <Box component={"span"}>
                {translator(`ticketStatus.${action.old_value.toLowerCase()}`)}
              </Box>
            </>
          ) : (
            <>
              <Box component={"span"}>{action.old_value}</Box>
              {` на `}
              <Box component={"span"}>{action.old_value}</Box>
            </>
          )}
        </>
      );
    }

    return (
      <>
        {` on ${formattedDate} changed the ${action.field_name} from `}
        <Box component={"span"}>{action.old_value}</Box>
        {` to `}
        <Box component={"span"}>{action.new_value}</Box>
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
          <Typography sx={{ fontWeight: 400 }}>
            <NavLink
              to={`${endpoints.profile}/${action.author.user_id}`}
              style={{ color: color, fontWeight: 600 }}
            >
              {`${action.author.firstname} ${action.author.lastname}`}
            </NavLink>

            {getActionText()}

          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export { Action };
