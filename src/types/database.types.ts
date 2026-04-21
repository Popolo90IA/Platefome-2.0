export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type MenuEventType =
  | "qr_scan"
  | "menu_view"
  | "dish_view"
  | "ar_view"
  | "video_play";

export type Language = "he" | "en" | "fr";

export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          slug: string;
          description: string | null;
          description_en: string | null;
          description_fr: string | null;
          logo_url: string | null;
          banner_url: string | null;
          address: string | null;
          phone: string | null;
          email: string | null;
          languages: string[];
          default_language: string;
          currency: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          slug: string;
          description?: string | null;
          description_en?: string | null;
          description_fr?: string | null;
          logo_url?: string | null;
          banner_url?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          languages?: string[];
          default_language?: string;
          currency?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          description_en?: string | null;
          description_fr?: string | null;
          logo_url?: string | null;
          banner_url?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          languages?: string[];
          default_language?: string;
          currency?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          restaurant_id: string;
          name: string;
          name_en: string | null;
          name_fr: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          name: string;
          name_en?: string | null;
          name_fr?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          restaurant_id?: string;
          name?: string;
          name_en?: string | null;
          name_fr?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      dishes: {
        Row: {
          id: string;
          restaurant_id: string;
          category_id: string;
          name: string;
          name_en: string | null;
          name_fr: string | null;
          description: string | null;
          description_en: string | null;
          description_fr: string | null;
          price: number;
          image_url: string | null;
          video_url: string | null;
          model_3d_url: string | null;
          ar_enabled: boolean;
          is_available: boolean;
          is_featured: boolean;
          is_new: boolean;
          is_signature: boolean;
          allergens: string[] | null;
          tags: string[] | null;
          photos_360: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          category_id: string;
          name: string;
          name_en?: string | null;
          name_fr?: string | null;
          description?: string | null;
          description_en?: string | null;
          description_fr?: string | null;
          price: number;
          image_url?: string | null;
          video_url?: string | null;
          model_3d_url?: string | null;
          ar_enabled?: boolean;
          is_available?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          is_signature?: boolean;
          allergens?: string[] | null;
          tags?: string[] | null;
          photos_360?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          restaurant_id?: string;
          category_id?: string;
          name?: string;
          name_en?: string | null;
          name_fr?: string | null;
          description?: string | null;
          description_en?: string | null;
          description_fr?: string | null;
          price?: number;
          image_url?: string | null;
          video_url?: string | null;
          model_3d_url?: string | null;
          ar_enabled?: boolean;
          is_available?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          is_signature?: boolean;
          allergens?: string[] | null;
          tags?: string[] | null;
          photos_360?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: "super_admin" | "restaurant_owner";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: "super_admin" | "restaurant_owner";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: "super_admin" | "restaurant_owner";
          created_at?: string;
        };
      };
      menu_events: {
        Row: {
          id: string;
          restaurant_id: string;
          event_type: MenuEventType;
          dish_id: string | null;
          user_agent: string | null;
          referrer: string | null;
          language: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          event_type: MenuEventType;
          dish_id?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          language?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          restaurant_id?: string;
          event_type?: MenuEventType;
          dish_id?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          language?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      restaurant_stats: {
        Row: {
          restaurant_id: string;
          name: string;
          qr_scans: number;
          menu_views: number;
          dish_views: number;
          ar_views: number;
          video_plays: number;
          views_last_7d: number;
          views_last_30d: number;
        };
      };
      admin_users_view: {
        Row: {
          user_id: string;
          email: string | null;
          signed_up_at: string;
          last_sign_in_at: string | null;
          role: "super_admin" | "restaurant_owner";
          restaurant_id: string | null;
          restaurant_name: string | null;
          restaurant_slug: string | null;
          restaurant_is_active: boolean | null;
        };
      };
    };
  };
}

export type Restaurant = Database["public"]["Tables"]["restaurants"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Dish = Database["public"]["Tables"]["dishes"]["Row"];
export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];
export type MenuEvent = Database["public"]["Tables"]["menu_events"]["Row"];
export type RestaurantStats = Database["public"]["Views"]["restaurant_stats"]["Row"];
export type AdminUser = Database["public"]["Views"]["admin_users_view"]["Row"];
