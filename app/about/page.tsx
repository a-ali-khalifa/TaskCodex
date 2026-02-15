import { Container, Typography } from "@mui/material";

const page = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        sx={{ fontSize: 32, fontWeight: 600, fontFamily: "rubik", mb: 2 }}
      >
        About
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          mb: 4,
          fontFamily: "rubik",
          lineHeight: 1.7,
        }}
      >
        Task Codex is an open-source, gamified task management app that makes
        productivity feel rewarding. By blending everyday task tracking with
        RPG-style progression — levels, XP, and achievements — it turns your
        to-do list into something you actually want to engage with.
        <br />
        <br />
        Create tasks, assign difficulty levels, and earn XP as you complete
        them. The harder the task, the bigger the reward. You can also further
        add descriptions, categories, statuses, and due dates to keep everything
        organized.
      </Typography>

      <hr className="text-gray-400" />

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "rubik",
          mt: 4,
          mb: 2,
        }}
      >
        Contributing
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          mb: 4,
          fontFamily: "rubik",
          lineHeight: 1.7,
        }}
      >
        A full contribution guide (including a CONTRIBUTING.md file) is
        currently in the works and will be available here soon. In the meantime,
        feel free to explore the repo and open issues or discussions if you'd
        like to get involved.
      </Typography>

      <hr className="text-gray-400" />
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "rubik",
          mt: 4,
          mb: 2,
        }}
      >
        Support
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          mb: 2,
          fontFamily: "rubik",
          lineHeight: 1.7,
        }}
      >
        Task Codex is completely free and open-source. The best way to support
        the project is simple: star the repository on GitHub (it only takes a
        click!) or share it with someone who might find it useful. Every star
        helps the project grow.
      </Typography>

      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 600,
          fontFamily: "rubik",
          mt: 4,
          mb: 2,
        }}
      >
        Donations
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          mb: 2,
          fontFamily: "rubik",
          lineHeight: 1.7,
        }}
      >
        Donations are entirely optional but help keep the project maintained and
        improving. If you'd like to contribute, you may use the link below.
        Regardless, all donations are well appreciated!
      </Typography>
    </Container>
  );
};

export default page;
