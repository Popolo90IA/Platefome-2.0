"use client";

import { OnboardingFooter } from "./_components/OnboardingFooter";
import { OnboardingHeader } from "./_components/OnboardingHeader";
import { OnboardingNav } from "./_components/OnboardingNav";
import { OnboardingProgress } from "./_components/OnboardingProgress";
import { S } from "./_lib/constants";
import { useOnboarding } from "./_lib/useOnboarding";
import { Step1 } from "./_steps/Step1";
import { Step2 } from "./_steps/Step2";
import { Step3 } from "./_steps/Step3";
import { Step4 } from "./_steps/Step4";

/**
 * OnboardingPage — 4-step wizard (restaurant details, first dish, QR, team).
 * Final step upserts the restaurant and redirects to the dashboard.
 */
export default function OnboardingPage() {
  const {
    step,
    loading,
    restaurantData,
    teamEmail,
    setTeamEmail,
    updateRestaurant,
    goNext,
    goBack,
    skip,
  } = useOnboarding();

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: S.void,
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <OnboardingNav restaurantName={restaurantData.name} />
      <OnboardingProgress step={step} />

      <main
        style={{
          flex: 1,
          padding: "50px 36px 60px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <OnboardingHeader step={step} />

        {step === 1 && (
          <Step1 values={restaurantData} onChange={updateRestaurant} />
        )}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 email={teamEmail} onChange={setTeamEmail} />}
      </main>

      <OnboardingFooter
        step={step}
        loading={loading}
        onBack={goBack}
        onSkip={skip}
        onNext={goNext}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: .4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
