/**
 * Mock data for the Spotlight board (Figma "B.7_Spotlight", node 2940:14174).
 * All names + positions + font sizes are sampled directly from the Figma
 * design's ~110 scattered TEXT child nodes (word-cloud of recipient names) —
 * a representative subset (24 nodes) was fetched via MoMorph `get_node` to
 * capture the real recipient names, relative scatter layout and the one
 * accent-colored "spotlight" name (Nguyễn Hoàng Linh, fill rgba(241,118,118,1)
 * on node 2940:14198). Positions are stored as percentages of the 1157x548
 * board so the cloud scales with the container.
 *
 * `receivedAt` times follow the design's ticker-text pattern (node
 * 2940:14230: "08:30PM Nguyễn Bá Chức đã nhận được một Kudos mới") but are
 * varied per entry since the design only shows one literal example.
 */

export type SpotlightNodeSize = "sm" | "md";

export interface SpotlightNameNodeData {
  id: string;
  name: string;
  xPct: number;
  yPct: number;
  size: SpotlightNodeSize;
  accent?: boolean;
  receivedAt: string;
}

const TIMES = [
  "08:30PM",
  "09:15AM",
  "07:45PM",
  "10:05AM",
  "06:20PM",
  "11:40AM",
  "08:55PM",
  "07:10AM",
  "09:50PM",
  "06:35AM",
  "10:25PM",
  "08:05AM",
];

type SpotlightNameSeed = Omit<SpotlightNameNodeData, "receivedAt">;

const SPOTLIGHT_NAME_SEEDS: SpotlightNameSeed[] = [
  { id: "15926", name: "Đỗ hoàng Hiệp", xPct: 84.4, yPct: 9.6, size: "sm" },
  { id: "15935", name: "Dương thúy An", xPct: 68.2, yPct: 14.1, size: "sm" },
  { id: "14188", name: "Dương thúy An", xPct: 27.2, yPct: 16.5, size: "sm" },
  { id: "15940", name: "Mai phương Thúy", xPct: 60.7, yPct: 17.2, size: "sm" },
  { id: "14189", name: "Mai phương Thúy", xPct: 19.7, yPct: 19.6, size: "sm" },
  { id: "15930", name: "Nguyễn Văn Quy", xPct: 64.8, yPct: 20.3, size: "md" },
  { id: "14187", name: "Nguyễn Văn Quy", xPct: 23.8, yPct: 22.7, size: "md" },
  { id: "15946", name: "Nguyễn Bá Chức", xPct: 77.4, yPct: 22.9, size: "sm" },
  {
    id: "14198",
    name: "Nguyễn Hoàng Linh",
    xPct: 47.1,
    yPct: 27.8,
    size: "md",
    accent: true,
  },
  { id: "15950", name: "Nguyễn Hoàng Linh", xPct: 66.2, yPct: 26.7, size: "sm" },
  { id: "14191", name: "Nguyễn Hoàng Linh", xPct: 25.2, yPct: 29.1, size: "sm" },
  { id: "15929", name: "Đỗ hoàng Hiệp", xPct: 58.0, yPct: 30.0, size: "sm" },
  { id: "14214", name: "Đỗ hoàng Hiệp", xPct: 17.0, yPct: 32.4, size: "sm" },
  { id: "14203", name: "Mai phương Thúy", xPct: 31.6, yPct: 37.9, size: "sm" },
  { id: "15957", name: "Lê Kiều Trang", xPct: 83.8, yPct: 37.9, size: "sm" },
  { id: "14206", name: "Lê Kiều Trang", xPct: 42.8, yPct: 40.2, size: "sm" },
  { id: "14220", name: "Lê Kiều Trang", xPct: 24.4, yPct: 41.7, size: "sm" },
  { id: "14215", name: "Nguyễn Văn Quy", xPct: 17.0, yPct: 42.6, size: "sm" },
  { id: "14211", name: "Nguyễn Bá Chức", xPct: 39.2, yPct: 57.2, size: "sm" },
  { id: "15987", name: "Nguyễn Hoàng Linh", xPct: 37.2, yPct: 66.7, size: "sm" },
  { id: "15965", name: "Nguyễn Văn Quy", xPct: 59.6, yPct: 71.6, size: "md" },
  { id: "15980", name: "Nguyễn Bá Chức", xPct: 52.7, yPct: 75.1, size: "sm" },
  { id: "15992", name: "Lê Kiều Trang", xPct: 78.6, yPct: 89.1, size: "sm" },
  { id: "15993", name: "Lê Kiều Trang", xPct: 89.3, yPct: 98.5, size: "sm" },
];

export const SPOTLIGHT_NAMES: SpotlightNameNodeData[] = SPOTLIGHT_NAME_SEEDS.map(
  (item, index) => ({ ...item, receivedAt: TIMES[index % TIMES.length] }),
);

/** Total kudos count shown in the board header (spec B.7.1, node 3007:17482). */
export const SPOTLIGHT_TOTAL_KUDOS = 388;

/**
 * Decorative "recent activity" ticker stack (node 2940:14230 + 3004:15995-15999),
 * 6 identical rows stacked bottom-to-top with decreasing opacity — reproduced
 * verbatim since the design shows the same message repeated at every opacity
 * step. Non-interactive, purely atmospheric per the design.
 */
export const SPOTLIGHT_TICKER_MESSAGE =
  "08:30PM Nguyễn Bá Chức đã nhận được một Kudos mới";
export const SPOTLIGHT_TICKER_OPACITIES = [0.1, 0.3, 0.5, 0.7, 1, 1];
