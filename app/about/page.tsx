import { Container, Typography } from "@mui/material";

const page = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        sx={{
          fontSize: { xs: 28, md: 32 },
          fontWeight: 600,
          fontFamily: "rubik",
          mb: 2,
        }}
      >
        About
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 16, md: 18 },
          mb: 4,
          fontFamily: "rubik",
          lineHeight: 1.7,
        }}
      >
        Task Codex is an open-source, gamified task management app that aims to
        make productivity feel rewarding. By blending everyday task tracking
        with RPG-style progression — levels, XP, and achievements — it turns
        your to-do list into something you actually want to engage with rather
        than procastinate from.
        <br />
        <br />
        Create tasks, assign difficulty levels, and earn XP as you complete
        them. The harder the task, the bigger the reward. You can also further
        set properties like descriptions, categories, statuses, and due dates.
        Most of these can be filtered to help keep everything organized.
      </Typography>

      <hr className="text-gray-400" />

      <Typography
        sx={{
          fontSize: { xs: 24, md: 28 },
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
          fontSize: { xs: 16, md: 18 },
          mb: 4,
          fontFamily: "rubik",
          lineHeight: 1.7,
        }}
      >
        A full contribution guide (including a CONTRIBUTING.md file) is
        currently in the works and will be available here soon. In the meantime,
        feel free to explore the GitHub repository and open issues or
        discussions if you would like to get involved.
      </Typography>

      <hr className="text-gray-400" />
      <Typography
        sx={{
          fontSize: { xs: 24, md: 28 },
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
          fontSize: { xs: 16, md: 18 },
          mb: 2,
          fontFamily: "rubik",
          lineHeight: 1.7,
        }}
      >
        Task Codex is completely free and open-source. The best way to support
        the project is to simply star the repository on GitHub (in one click!)
        or share it with someone who might find it useful. Every star helps the
        project grow.
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: 24, md: 28 },
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
          fontSize: { xs: 16, md: 18 },
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
