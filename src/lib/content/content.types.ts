export interface FooterContent {
  sections: Array<{
    title: string;
    mapImage: string | null;
    address: string;
    phone: string;
    email: string;
    socialLinks: Array<{ platform: string; url: string }>;
    copyright: string;
    links: Array<{ text: string; url: string }>;
  }>;
}
