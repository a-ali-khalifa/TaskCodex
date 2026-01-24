import { useRef } from "react";

type WelcomeModalProps = {
  username: string;
  onComplete: () => void;
};

const WelcomeModal = ({ username, onComplete }: WelcomeModalProps) => {
  const intro = useRef<any | null>(null);

  return <div>WelcomeModal</div>;
};

export default WelcomeModal;
