"use client";

import { useContent } from "@/lib/content/content.context";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const { content } = useContent();
  const mapImageUrl = content.footer.mapImage; // Get the uploaded image URL/base64

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8">
          <div className="flex items-center gap-2">
            <FaPhone className="w-5 h-5 text-gray-400" />
            <p className="text-gray-400">{content.footer.phone1}</p>
          </div>
          {content.footer.phone2 && (
            <div className="flex items-center gap-2">
              <FaPhone className="w-5 h-5 text-gray-400" />
              <p className="text-gray-400">{content.footer.phone2}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FaEnvelope className="w-5 h-5 text-gray-400" />
            <p className="text-gray-400">{content.footer.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
            <p className="text-gray-400">{content.footer.address}</p>
          </div>
        </div>

        {/* Map Image Section */}
        <div className="mt-8">
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
            {mapImageUrl ? (
              <Image
                src={mapImageUrl}
                alt={`Map location: ${content.footer.address}`}
                fill // Use fill combined with object-contain/cover
                className="object-cover" // Change to object-cover to fill the container
                priority // Load image eagerly if it's important
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
            &copy; {new Date().getFullYear()} {content.footer.title}. Бүх эрх
            хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
