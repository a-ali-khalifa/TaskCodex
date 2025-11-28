"use client";

import { Box, Typography, Button, Container, Paper } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iusto
        dolorum nisi at veniam laboriosam, officia deleniti blanditiis?
        Assumenda, obcaecati?
      </p> */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Hero Section */}

        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontFamily: "rubik",
            }}
          >
            Welcome to TaskCodex ✧
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
              fontFamily: "nunito",
            }}
          >
            Track your tasks, stay organized, and level up — all in a clean and
            simple interface that remembers you.
          </Typography>

          <Button
            component={Link}
            href="/tasks"
            size="large"
            variant="contained"
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: "1.1rem",
              fontFamily: "nunito",
            }}
          >
            Get Started Leveling
          </Button>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            What You Can Do
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Track Tasks
              </Typography>
              <Typography color="text.secondary">
                Add, view, and manage tasks with custom details, progress, and
                status.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Your Data is Local
              </Typography>
              <Typography color="text.secondary">
                No accounts needed — everything is saved in your browser for
                fast, simple use.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Clean Interface
              </Typography>
              <Typography color="text.secondary">
                A minimal and modern design keeps your focus on what matters.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Expandable
              </Typography>
              <Typography color="text.secondary">
                Build extra categories, notes, or difficulty levels as you
                journey.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
