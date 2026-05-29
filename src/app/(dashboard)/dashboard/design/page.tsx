"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDesign } from "./_lib/hooks/useDesign";
import { DesignHeader } from "./_components/DesignHeader";
import { DesignTabsBar } from "./_components/DesignTabsBar";
import { ColorTab } from "./_components/ColorTab";
import { FontTab } from "./_components/FontTab";
import { LayoutTab } from "./_components/LayoutTab";
import { ImagesTab } from "./_components/ImagesTab";
import { SaveButton } from "./_components/SaveButton";
import { PreviewToolbar } from "./_components/PreviewToolbar";
import { PreviewFrame } from "./_components/PreviewFrame";

/**
 * DesignPage — orchestrateur : panneau gauche (controls par onglet) + panneau
 * droit (live iframe preview).
 */
export default function DesignPage() {
  const s = useDesign();

  if (s.loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!s.restaurant) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        לא נמצאה מסעדה. צור מסעדה בהגדרות תחילה.
      </div>
    );
  }

  return (
    <div
      className="animate-fade-up"
      style={{
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: 20,
        height: "calc(100vh - 80px)",
        alignItems: "start",
        direction: "ltr",
        margin: "0 -32px",
      }}
    >
      {/* Left — controls */}
      <div
        className="space-y-4 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 80px)",
          paddingLeft: 32,
          paddingRight: 4,
          direction: "rtl",
        }}
      >
        <DesignHeader />

        <Card className="shadow-premium">
          <CardHeader className="pb-0">
            <DesignTabsBar active={s.tab} onSelect={s.setTab} />
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            {s.tab === "color" && (
              <ColorTab
                themePrimary={s.form.theme_primary}
                darkMode={s.form.theme_dark_mode}
                onChangePrimary={(c) => s.updateForm({ theme_primary: c })}
                onToggleDark={() =>
                  s.updateForm({ theme_dark_mode: !s.form.theme_dark_mode })
                }
              />
            )}
            {s.tab === "font" && (
              <FontTab
                fontPack={s.form.theme_font_pack}
                onChange={(k) => s.updateForm({ theme_font_pack: k })}
              />
            )}
            {s.tab === "layout" && (
              <LayoutTab
                layout={s.form.menu_layout}
                heroStyle={s.form.menu_hero_style}
                categoryStyle={s.form.menu_category_style}
                onChangeLayout={(k) => s.updateForm({ menu_layout: k })}
                onChangeHero={(k) => s.updateForm({ menu_hero_style: k })}
                onChangeCategory={(k) =>
                  s.updateForm({ menu_category_style: k })
                }
              />
            )}
            {s.tab === "images" && (
              <ImagesTab
                logoUrl={s.form.logo_url}
                bannerUrl={s.form.banner_url}
                restaurantName={s.form.name}
                onChangeLogo={(url) => s.updateForm({ logo_url: url })}
                onChangeBanner={(url) => s.updateForm({ banner_url: url })}
              />
            )}
          </CardContent>
        </Card>

        <SaveButton
          saving={s.saving}
          saved={s.saved}
          error={s.error}
          onSave={s.handleSave}
        />
      </div>

      {/* Right — live iframe preview */}
      <div
        ref={s.rightPanelRef}
        className="flex flex-col gap-3"
        style={{
          height: "calc(100vh - 80px)",
          position: "sticky",
          top: 0,
        }}
      >
        <PreviewToolbar
          mode={s.previewMode}
          tabletLandscape={s.tabletLandscape}
          onSelectMode={s.setPreviewMode}
          onToggleLandscape={() => s.setTabletLandscape((v) => !v)}
        />
        <PreviewFrame
          menuUrl={s.menuUrl}
          mode={s.previewMode}
          tabletLandscape={s.tabletLandscape}
          panelW={s.panelSize.w}
          windowH={s.windowH}
          iframeRef={s.iframeRef}
          onIframeLoad={s.handleIframeLoad}
        />
      </div>
    </div>
  );
}
