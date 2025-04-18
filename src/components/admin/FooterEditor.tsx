"use client";

import { useContent } from "@/lib/content/content.context";
import Image from "next/image";
import { useState } from "react";

export const FooterEditor = () => {
  const { content, updateContent } = useContent();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    content.footer.mapImage || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        updateContent("footer", {
          ...content.footer,
          mapImage: base64String,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      updateContent("footer", {
        ...content.footer,
        mapImage: "",
      });
    }
  };

  const mapCoordinates = content.footer.mapCoordinates || {
    lat: 47.9205,
    lng: 106.9172,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Footer Section</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Map Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {previewUrl && (
            <div className="mt-2 relative w-full h-48">
              <Image
                src={previewUrl}
                alt="Map Preview"
                fill
                className="object-contain rounded-lg border border-gray-300"
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Map Coordinates
          </label>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div>
              <label className="block text-xs text-gray-500">Latitude</label>
              <input
                type="number"
                step="any"
                value={mapCoordinates.lat}
                onChange={(e) =>
                  updateContent("footer", {
                    ...content.footer,
                    mapCoordinates: {
                      ...mapCoordinates,
                      lat: parseFloat(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Longitude</label>
              <input
                type="number"
                step="any"
                value={mapCoordinates.lng}
                onChange={(e) =>
                  updateContent("footer", {
                    ...content.footer,
                    mapCoordinates: {
                      ...mapCoordinates,
                      lng: parseFloat(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            value={content.footer.address}
            onChange={(e) =>
              updateContent("footer", {
                ...content.footer,
                address: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone 1
          </label>
          <input
            type="text"
            value={content.footer.phone1}
            onChange={(e) =>
              updateContent("footer", {
                ...content.footer,
                phone1: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone 2
          </label>
          <input
            type="text"
            value={content.footer.phone2}
            onChange={(e) =>
              updateContent("footer", {
                ...content.footer,
                phone2: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={content.footer.email}
            onChange={(e) =>
              updateContent("footer", {
                ...content.footer,
                email: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};
