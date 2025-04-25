export const MENU = [
  {
    label: "Танилцуулга",
    href: "introduction",
  },
  {
    label: "Хууль эрх зүй",
    href: "legal",
  },
  {
    label: "Мэдээ мэдээлэл",
    href: "news",
  },
  {
    label: "Хэрэгтэй холбоосууд",
    href: "links",
  },
  {
    label: "Судалгаа, санал асуулга",
    href: "survey",
  },
  {
    label: "Гэрээт байгууллага",
    href: "contract",
  },
];

export const config = {
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://192.168.88.93:8080",
};
