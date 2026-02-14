import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type LevelBarProps = {
  level: number;
  currentXP: number;
  xpNeeded: number;
  xpProgress: string;
};

const LevelBar = ({
  level,
  currentXP,
  xpNeeded,
  xpProgress,
}: LevelBarProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        fontFamily: "rubik",
        zIndex: 1000, //theme.zIndex.drawer + 1,
        borderRadius: 0,
        borderTop: "1px solid #e0e0e0", // Optional: subtle top border
      }}
    >
      <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        <div className="flex gap-4">
          <div className="border-2 font-medium border-primary text-primary rounded-full size-12 flex justify-center items-center text-2xl">
            {level}
          </div>
          <div>
            <p className="font-semibold">{`Level ${level}`}</p>
            <p className="text-gray-600">{`${currentXP} / ${xpNeeded} XP`}</p>
          </div>
        </div>
        <div className="font-medium text-primary">{`${xpNeeded - currentXP} XP to Level ${level + 1}`}</div>
      </div>
      <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden max-w-[1200px] mx-auto">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${xpProgress}%` }}
        />
      </div>
    </Paper>
  );
};

export default LevelBar;
