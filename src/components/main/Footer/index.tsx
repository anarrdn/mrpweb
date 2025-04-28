"use client";

import { useContent } from "@/lib/content/content.context";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const { content } = useContent();

  const getValidImageUrl = (url: string | null) => {
    if (!url) return null;

    // If it's a base64 data URL, return it as is
    if (url.startsWith("data:image")) {
      return url;
    }

    // If it's a relative URL, add a leading slash
    if (!url.startsWith("/") && !url.startsWith("http")) {
      return `/${url}`;
    }

    return url;
  };

  // Get the first section or use empty values as fallback
  const footerSection = content.footer?.sections?.[0] || {
    title: "",
    mapImage: null,
    address: "",
    phone: "",
    email: "",
    socialLinks: [],
    copyright: "",
    links: [],
  };

  const mapImageUrl = getValidImageUrl(footerSection.mapImage);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8">
          {footerSection.phone && (
            <div className="flex items-center gap-2">
              <FaPhone className="w-5 h-5 text-gray-400" />
              <p className="text-gray-400">{footerSection.phone}</p>
            </div>
          )}
          {footerSection.email && (
            <div className="flex items-center gap-2">
              <FaEnvelope className="w-5 h-5 text-gray-400" />
              <p className="text-gray-400">{footerSection.email}</p>
            </div>
          )}
          {footerSection.address && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
              <p className="text-gray-400">{footerSection.address}</p>
            </div>
          )}
        </div>

        {/* Map Image Section */}
        <div className="mt-8">
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
            {mapImageUrl ? (
              <Image
                src={mapImageUrl}
                alt={`Map location: ${footerSection.address}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <p className="text-gray-500 text-center px-4">
                No map image uploaded.
              </p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {footerSection.title || "Medtech MRP"}. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
