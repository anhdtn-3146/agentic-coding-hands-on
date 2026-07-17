/**
 * Static mock data for the "Viết KUDOS" form — Figma "Viết Kudo" (ihQ26W78P2).
 * Per clarification decision #2: no backend, so the recipient autocomplete and
 * hashtag picker are backed by small in-code sample lists rather than real data.
 */

export interface Sunner {
  id: string;
  name: string;
}

/** Sample Sunners for the "Người nhận" (recipient) autocomplete. */
export const MOCK_SUNNERS: Sunner[] = [
  { id: "s1", name: "Nguyễn Văn An" },
  { id: "s2", name: "Trần Thị Bích" },
  { id: "s3", name: "Lê Hoàng Nam" },
  { id: "s4", name: "Phạm Thu Hà" },
  { id: "s5", name: "Đỗ Minh Quân" },
  { id: "s6", name: "Vũ Ngọc Lan" },
  { id: "s7", name: "Hoàng Đức Anh" },
  { id: "s8", name: "Bùi Thị Mai" },
];
