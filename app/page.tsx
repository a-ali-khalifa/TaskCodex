"use client";

import { Button } from "@/components/Button";
import { Container, Typography } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="">
      <Container maxWidth="md" sx={{ py: 16 }}>
        {/* Hero Section */}
        <section id="hero" className="text-center font-rubik">
          <div className="bg-white/70 p-2 rounded-full h-10 flex flex-col justify-center border border-[#3F65FF] ">
            <p className="text-xl">Level up productivity 🎚️</p>
          </div>
          <br />
          <p className="text-8xl">
            Making tasks feel like{" "}
            <span className="text-primary drop-shadow-2xl drop-shadow-black/50">
              progress
            </span>
          </p>

          <p className="text-2xl text-black/60 m-6">
            Transform your to-do list into a fun leveling journey. Gain
            experience points, track your growth and celebrate each win.
          </p>

          <div className="flex justify-center gap-3">
            <Link href={"/dashboard"}>
              <Button label="Start Leveling 🚀" size="lg" variant="outline" />
            </Link>

            <Link href={""}>
              <Button
                label="Source Code ⚙️"
                size="lg"
                className="border-2 border-primary"
                variant="solid"
              />
            </Link>
          </div>
        </section>
        <section id="features">
          {/* <Typography>Features</Typography>
          <div className="grid grid-cols-3 gap-2">
            <div>Feature</div>
            <div>Feature</div>
            <div>Feature</div>
            <div>Feature</div>
            <div>Feature</div>
            <div>Feature</div>
          </div> */}
        </section>
      </Container>
    </div>
  );
}
