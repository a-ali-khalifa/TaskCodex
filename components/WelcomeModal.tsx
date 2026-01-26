import { Button } from "@/components/Button";
import { Container, Paper, TextField } from "@mui/material";
import { useRef, useState } from "react";

type WelcomeModalProps = {
  isOpen: boolean;
  onComplete: () => void;
};

const WelcomeModal = ({ onComplete }: WelcomeModalProps) => {
  const intro = useRef<any | null>(null);
  const [username, setUsername] = useState<string>();

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
      }}
      className="min-h-[90vh]"
    >
      <Paper
        elevation={3}
        sx={{
          my: 4,
          p: 4,
          borderRadius: 10,
          fontFamily: "rubik",
        }}
      >
        <h1 className="text-3xl font-medium mb-4">Welcome to Task Codex.</h1>
        <p className="text-lg mb-2">Enter your name to get started:</p>
        <TextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4"
          sx={{
            fontFamily: "rubik",
            mb: 4,
          }}
        />
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1"
            label="Confirm"
            onClick={() => {
              localStorage.setItem("username", username!);
              onComplete();
            }}
          />
          <Button
            className="flex-1"
            label="Clear"
            onClick={() => {
              setUsername("");
            }}
            variant="outline"
          />
        </div>
      </Paper>
    </Container>
    // <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    //   <div className="bg-white p-6 rounded-xl w-80">
    //     <h2 className="text-lg font-semibold font-rubik">Welcome!</h2>
    //     <h3 className="text-md mb-3 font-rubik">Please your name</h3>
    //     <input
    //       type="text"
    //       placeholder="Enter your name"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       className="border p-2 rounded w-full mb-4 font-rubik"
    //     />
    //     <Button
    //       label="Complete"
    //       onClick={() => {
    //         localStorage.setItem("username", username!);
    //         onComplete();
    //       }}
    //     />
    //   </div>
    // </div>
  );
};

export default WelcomeModal;
