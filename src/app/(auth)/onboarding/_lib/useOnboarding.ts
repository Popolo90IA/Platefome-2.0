"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { STEPS, type RestaurantData } from "./constants";

/**
 * useOnboarding — wizard state (step, loading, restaurant data, team email)
 * + navigation. Final step upserts the restaurant then redirects to dashboard.
 */
export function useOnboarding() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    name: "",
    slug: "",
    city: "",
  });
  const [teamEmail, setTeamEmail] = useState("");

  const goNext = async () => {
    if (step === STEPS.length) {
      setLoading(true);
      if (restaurantData.name && restaurantData.slug) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("restaurants").upsert(
            {
              user_id: user.id,
              name: restaurantData.name,
              slug: restaurantData.slug.toLowerCase().replace(/\s+/g, "-"),
              is_active: true,
            },
            { onConflict: "user_id" },
          );
        }
      }
      router.push("/dashboard");
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));
  const skip = () => setStep((s) => s + 1);
  const updateRestaurant = (k: string, v: string) =>
    setRestaurantData((d) => ({ ...d, [k]: v }));

  return {
    step,
    loading,
    restaurantData,
    teamEmail,
    setTeamEmail,
    updateRestaurant,
    goNext,
    goBack,
    skip,
  };
}
