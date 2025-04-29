// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import { apiClient } from "@/lib/api/client";
// import { FooterSection } from "@/lib/api/types";

// const Footer = () => {
//   const [footerSection, setFooterSection] = useState<FooterSection>({
//     id: "",
//     title: "",
//     mapImage: null,
//     address: "",
//     phone: "",
//     email: "",
//     socialLinks: [],
//     copyright: "",
//     links: [],
//   });

//   useEffect(() => {
//     const fetchFooter = async () => {
//       try {
//         const response = await apiClient.getFooter();
//         if (response.sections && response.sections.length > 0) {
//           setFooterSection(response.sections[0]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch footer:", error);
//       }
//     };

//     fetchFooter();
//   }, []);

//   const getValidImageUrl = (url: string | null | undefined) => {
//     if (!url) return null;

//     // If it's a base64 data URL, return it as is
//     if (url.startsWith("data:image")) {
//       return url;
//     }

//     // If it's a relative URL, add a leading slash
//     if (!url.startsWith("/") && !url.startsWith("http")) {
//       return `/${url}`;
//     }

//     return url;
//   };

//   const mapImageUrl = getValidImageUrl(footerSection.mapImage);

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         {/* Contact Info */}
//         <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8">
//           {footerSection.phone && (
//             <div className="flex items-center gap-2">
//               <FaPhone className="w-5 h-5 text-gray-400" />
//               <p className="text-gray-400">{footerSection.phone}</p>
//             </div>
//           )}
//           {footerSection.email && (
//             <div className="flex items-center gap-2">
//               <FaEnvelope className="w-5 h-5 text-gray-400" />
//               <p className="text-gray-400">{footerSection.email}</p>
//             </div>
//           )}
//           {footerSection.address && (
//             <div className="flex items-center gap-2">
//               <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
//               <p className="text-gray-400">{footerSection.address}</p>
//             </div>
//           )}
//         </div>

//         {/* Map Image */}
//         {mapImageUrl && (
//           <div className="mb-8">
//             <Image
//               src={mapImageUrl}
//               alt="Map"
//               width={800}
//               height={400}
//               className="w-full h-auto rounded-lg"
//             />
//           </div>
//         )}

//         {/* Social Links */}
//         {footerSection.socialLinks && footerSection.socialLinks.length > 0 && (
//           <div className="flex justify-center gap-4 mb-8">
//             {footerSection.socialLinks.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 {link.platform}
//               </a>
//             ))}
//           </div>
//         )}

//         {/* Links */}
//         {footerSection.links && footerSection.links.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             {footerSection.links.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.url}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 {link.text}
//               </a>
//             ))}
//           </div>
//         )}

//         {/* Copyright */}
//         {footerSection.copyright && (
//           <div className="text-center text-gray-400">
//             <p>{footerSection.copyright}</p>
//           </div>
//         )}
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { EnvelopeClosedIcon, PersonIcon, ReaderIcon, PinLeftIcon } from '@radix-ui/react-icons';

const Footer = () => {
  return (
    <footer className="text-white py-6" style={{ backgroundColor: '#00b1ad' }}>
      <img src="/branding/map.png" alt="Map" className="w-full rounded-lg mb-8" />
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <PersonIcon className="w-6 h-6" />
          <div>
            <div className="font-bold">7799101/1</div>
            <div className="text-xs">Нийслэлийн Эрүүл мэндийн газар</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ReaderIcon className="w-6 h-6" />
          <div>
            <div className="font-bold">7799 0101</div>
            <div className="text-xs">Гомдол мэдээлэл авах</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <EnvelopeClosedIcon className="w-6 h-6" />
          <div>
            <div className="font-bold">info@emg.ub.gov.mn</div>
            <div className="text-xs">Гомдол мэдээлэл хүлээн авах</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PinLeftIcon className="w-6 h-6" />
          <div className="text-xs">
            Монгол Улс, Улаанбаатар хот, Чингэлтэй дүүрэг, 4-р хороо, Ж.Самбуугийн гудамж-16.<br />
            Нийслэлийн засаг захиргааны III байр
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;