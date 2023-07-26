import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { Scope } from "./components/Scope";
import IPalette from "../../theme/IPalette.interface";

export interface IScope {
  id: number;
  order: number;
  name: string;
  title: string;
}

const Queue: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [scopesList, setScopesList] = useState([
    {
      id: 1,
      order: 1,
      name: "Reports",
      title: t("queue.scopes.reportTitle"),
    },
    {
      id: 2,
      order: 2,
      name: "Q/A",
      title: t("queue.scopes.questionTitle"),
    },
    {
      id: 3,
      order: 3,
      name: "Suggestion",
      title: t("queue.scopes.suggestionTitle"),
    },
  ]);

  console.log(scopesList);

  const [currentScope, setCurrentScope] = useState<IScope | null>(null);

  const sortCards = (a: { order: number }, b: { order: number }) =>
    a.order - b.order;

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("queue.heading")}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          pt: 12,
          overflowX: "scroll",
          pb: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: palette.grey.divider,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {scopesList.sort(sortCards).map(scope => (
          <Scope
            scope={scope}
            currentScope={currentScope}
            setCurrentScope={setCurrentScope}
            scopesList={scopesList}
            setScopesList={setScopesList}
            key={scope.name}
          />
        ))}
      </Box>
    </Grid>
  );
};

export { Queue };
