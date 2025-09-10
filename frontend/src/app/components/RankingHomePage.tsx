"use client";
import { PlayersPayload } from "@/types/fantasy.type";
import React from "react";
import { PlayerRankingCard } from "./ranking/PlayerRankingCard";
import { TrendingCard } from "./ranking/TrendingCard";
import { useQuery } from "@tanstack/react-query";
import Reveal from "@/components/theme-ui/reveal/Reveal";

async function fetchPlayers(): Promise<PlayersPayload> {
  const res = await fetch("/data/players.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load player data");
  return res.json();
}

const RankingHomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });

  if (isLoading)
    return <div className="p-6 text-muted-foreground">Loading…</div>;
  if (isError || !data)
    return <div className="p-6 text-rose-600">Failed to load data.</div>;

  return (
    <section className="container ptb">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Reveal variant="slide" direction="right" className="lg:col-span-8">
          <PlayerRankingCard data={data.players} />
        </Reveal>
        <Reveal variant="slide" direction="left" className="lg:col-span-4">
          <TrendingCard up={data.trendingUp} down={data.trendingDown} />
        </Reveal>
      </div>
    </section>
  );
};

export default RankingHomePage;
