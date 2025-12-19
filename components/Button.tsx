import * as material from "@mui/material";
type ButtonProps = {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  color?: string;
  background?: string;
};

export const Button = ({ label, onClick, background, color }: ButtonProps) => {
  return (
    <material.Button
      onClick={onClick}
      sx={{
        textTransform: "none",
        fontFamily: "poppins",
        fontSize: 20,
        background: background ?? "white",
        // border: 1,
        borderRadius: 10,
        color: color ?? "#3F65FF",
        fontWeight: 400,
        py: 1.5,
        px: 3,
        boxShadow: 1,
      }}
    >
      {label}
    </material.Button>
  );
};
