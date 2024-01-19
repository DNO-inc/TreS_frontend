import { FC } from "react";
import { useTranslation } from "react-i18next";

interface StatusTileProps {
  count: number;
  title: string;
  color: string;
}

const StatusTile: FC<StatusTileProps> = ({ count, title, color }) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        borderBottom: "1px solid #4F4F58",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#292E33",
            border: `4px solid rgba(${color}, 1`,
          }}
        />
        <div>{t(`statusesFilter.${title.toLowerCase()}`)}</div>
      </div>
      <div
        style={{
          backgroundColor: `rgba(${color}, 0.12)`,
          color: `rgba(${color}, 1)`,
          border: `0.5px solid rgba(${color}, 1)`,
          borderRadius: 4,
          padding: "5px 8px",
          fontSize: 14,
        }}
      >
        {count}
      </div>
    </div>
  );
};

export { StatusTile };
