"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import * as toxicity from "@tensorflow-models/toxicity";
import { addToLeaderBoard } from "./LeaderBoard.action";
import { useRouter } from "next/navigation";

export default function AddScore() {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nicknameError, setNicknameError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadModel = async () => {
      const threshold = 0;
      const loadedModel = await toxicity.load(threshold);
      setModel(loadedModel);
      setLoading(false);
    };

    loadModel();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const blockedWords = [
    "hitler",
    "h1tler",
    "h1tl3r",
    "h!tler",
    "h1tL3r",
    "h!tL3r",
    "vivitler",
  ];

  const cleanNickname = (nickname) => {
    return nickname.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  };

  const validateNickname = async (nickname) => {
    const cleanedNickname = cleanNickname(nickname);

    const containsBlockedWord = blockedWords.some((word) =>
      cleanedNickname.includes(word)
    );

    if (containsBlockedWord) {
      return {
        valid: false,
      };
    }

    const predictions = await model.classify([nickname]);
    const isToxic = predictions.some((prediction) =>
      prediction.results.some(
        (result) => result.match === true || result.match === null
      )
    );

    if (isToxic) {
      return {
        valid: false,
      };
    }

    return { valid: true, message: "Pseudo accepté." };
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const validationResult = await validateNickname(data.nickname);

    setLoading(false);

    if (!validationResult.valid) {
      setNicknameError(true);
      return;
    }

    setNicknameError(false);

    const { nickname, points } = data;
    const parsedPoints = parseInt(points);

    if (isNaN(parsedPoints) || parsedPoints <= 0) {
      alert("Les points doivent être un nombre positif.");
      return;
    }

    try {
      const response = await addToLeaderBoard({
        nickname,
        points: parsedPoints,
      });

      if (response.status !== 201) {
        return;
      }

      close();
      return window.location.reload();
    } catch (error) {
      // Gestion d'éventuelles erreurs
      console.error("Erreur lors de l'ajout au leaderboard:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-fit mx-auto">
        <Button variant="outline" asChild>
          <div>
            New score
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New score</DialogTitle>
        <DialogDescription className="hidden">
          Add your score to the leaderboard
        </DialogDescription>
        <DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {nicknameError && (
              <div className="text-sm text-red-500 mb-3">
                <p>
                  Your nickname contain profanity word. Please choose an other
                  one !
                </p>
              </div>
            )}
            {(errors.nickname || errors.points) && (
              <div className="text-sm text-red-500 mb-3">
                <p>All the fiels are required</p>
              </div>
            )}
            <div className="flex gap-3 flex-wrap flex-col md:flex-row md:items-end">
              <div className="flex flex-col">
                <Label className="text-left mb-1">Nickname</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...register("nickname", {
                    required: true,
                    maxLength: 60,
                  })}
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-left">Points</Label>
                <Input
                  type="number"
                  placeholder="20"
                  {...register("points", { required: true, min: 1, max: 40 })}
                />
              </div>

              <Button type="submit">
                {loading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-loader-circle animate-spin"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
