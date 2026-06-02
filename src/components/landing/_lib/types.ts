export interface ModelEntry {
  url: string;
  label: string;
}

export interface FrameCorner {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  rot: number;
}

export interface MiniSpec {
  label: string;
  value: string;
}
