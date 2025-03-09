interface Frame {
  id: number;
  defaultPos: { x: number; y: number; w: number; h: number };
  corner: string;
  edgeHorizontal: string;
  edgeVertical: string;
  mediaSize: number;
  borderThickness: number;
  borderSize: number;
  autoplayMode: "all" | "hover";
  isHovered: boolean;
}

export const initialFrames: Frame[] = [
  {
    id: 1,
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner:
      "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 2,
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner:
      "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_corner_update.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_vert_update.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 3,
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner:
      "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Corner_update.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_hori_update.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 4,
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner:
      "https://static.cdn-luma.com/files/9e67e05f37e52522/4_corner_update.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/9e67e05f37e52522/4_hori_update.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/9e67e05f37e52522/4_vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 5,
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner:
      "https://static.cdn-luma.com/files/9e67e05f37e52522/5_corner_update.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/9e67e05f37e52522/5_hori_update.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/9e67e05f37e52522/5_verti_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 6,
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner-1.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/1199340587e8da1d/6_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 7,
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_corner.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_hori.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 8,
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/8_corner.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/981e483f71aa764b/8_hori.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/981e483f71aa764b/8_verticle.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 9,
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/9_corner.png",
    edgeHorizontal:
      "https://static.cdn-luma.com/files/981e483f71aa764b/9_hori.png",
    edgeVertical:
      "https://static.cdn-luma.com/files/981e483f71aa764b/9_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
];
