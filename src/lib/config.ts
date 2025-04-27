import { config as apiConfig } from './api/config';

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
  backendUrl: apiConfig.backendUrl,
  apiVersion: apiConfig.apiVersion,
  timeout: apiConfig.timeout,
  authTokenKey: apiConfig.authTokenKey,
};
