"use client";

/**
 * DecorativeQR — pattern QR-like statique (non scannable), fallback visuel.
 */
export function DecorativeQR({ size = 120 }: { size?: number }) {
  const pattern = [
    "111111101011111111",
    "100000101000000001",
    "101110100001011101",
    "101110101110011101",
    "101110100100011101",
    "100000101010100001",
    "111111101010101111",
    "000000001011110000",
    "101110111011010011",
    "110001000110101100",
    "001110110001101011",
    "111000101100010100",
    "000000001110101011",
    "111111101001100100",
    "100000101001010011",
    "101110101101101100",
    "101110100111100011",
    "111111101010101111",
  ];
  const cells = pattern.length;
  const cell = size / cells;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
    >
      <rect width={size} height={size} fill="hsl(38,34%,98%)" />
      {pattern.map((row, y) =>
        row
          .split("")
          .map((v, x) =>
            v === "1" ? (
              <rect
                key={`${x}-${y}`}
                x={x * cell}
                y={y * cell}
                width={cell}
                height={cell}
                fill="hsl(24,18%,16%)"
              />
            ) : null,
          ),
      )}
    </svg>
  );
}
