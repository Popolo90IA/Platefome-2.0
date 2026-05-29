"use client";

import { useSettings } from "./_lib/hooks/useSettings";
import { SettingsHeader } from "./_components/SettingsHeader";
import { AccountInfoCard } from "./_components/AccountInfoCard";
import { RestaurantProfileCard } from "./_components/RestaurantProfileCard";
import { LanguagesCurrencyCard } from "./_components/LanguagesCurrencyCard";
import { MenuVisibilityCard } from "./_components/MenuVisibilityCard";
import { NotificationsCard } from "./_components/NotificationsCard";
import { PasswordChangeCard } from "./_components/PasswordChangeCard";
import { DangerZoneCard } from "./_components/DangerZoneCard";
import { SaveBar } from "./_components/SaveBar";

/**
 * SettingsPage — page הגדרות restaurant.
 * Orchestrateur : délègue logique au hook `useSettings` + composants UI.
 */
export default function SettingsPage() {
  const s = useSettings();

  if (s.loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      <SettingsHeader restaurantSlug={s.restaurant?.slug ?? null} />

      <div className="max-w-2xl space-y-6">
        <AccountInfoCard
          userEmail={s.userEmail}
          userCreatedAt={s.userCreatedAt}
        />

        <form
          onSubmit={s.handleSubmit}
          className="space-y-6"
          id="profile-form"
        >
          <RestaurantProfileCard
            form={s.form}
            onNameChange={s.handleNameChange}
            setForm={s.setForm}
          />

          <LanguagesCurrencyCard form={s.form} setForm={s.setForm} />

          <MenuVisibilityCard
            isActive={s.isActive}
            setIsActive={s.setIsActive}
          />

          <SaveBar saving={s.saving} saved={s.saved} error={s.error} />
        </form>

        <NotificationsCard
          notifWeekly={s.notifWeekly}
          setNotifWeekly={s.setNotifWeekly}
        />

        <PasswordChangeCard
          pwForm={s.pwForm}
          setPwForm={s.setPwForm}
          showPw={s.showPw}
          setShowPw={s.setShowPw}
          pwSaving={s.pwSaving}
          pwSaved={s.pwSaved}
          pwError={s.pwError}
          onSubmit={s.handlePasswordChange}
        />

        <DangerZoneCard
          restaurantName={s.form.name}
          hasRestaurant={!!s.restaurant}
          dangerConfirm={s.dangerConfirm}
          setDangerConfirm={s.setDangerConfirm}
          deactivating={s.deactivating}
          deactivateSuccess={s.deactivateSuccess}
          onDeactivate={s.handleDeactivate}
        />
      </div>
    </div>
  );
}
