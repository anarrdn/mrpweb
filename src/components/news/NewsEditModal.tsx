"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, ChangeEvent, FormEvent } from "react";
import { News } from "@/types/news";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";

interface NewsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: News | null;
  onSave: (updatedNews: News) => void;
}

export function NewsEditModal({
  isOpen,
  onClose,
  news,
  onSave,
}: NewsEditModalProps) {
  const [title, setTitle] = useState(news?.title || "");
  const [newsContent, setNewsContent] = useState(news?.content || "");
  const [image, setImage] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [link, setLink] = useState(news?.link || "");
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewsContent(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setShouldDeleteImage(false);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setShouldDeleteImage(true);
  };

  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdf(e.target.files[0]);
    }
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (news) {
      const updatedNews: News = {
        ...news,
        title,
        content: newsContent,
        image: shouldDeleteImage
          ? null
          : image
          ? URL.createObjectURL(image)
          : news.image,
        pdf: pdf ? URL.createObjectURL(pdf) : news.pdf,
        link: link || null,
      };
      onSave(updatedNews);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit News</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="mt-1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={newsContent}
              onChange={handleContentChange}
              className="mt-1 min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
            {(image || news?.image) && !shouldDeleteImage && (
              <div className="relative h-32 mt-2 rounded group">
                <Image
                  src={image ? URL.createObjectURL(image) : news?.image || ""}
                  alt="Preview"
                  fill
                  className="object-cover rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleDeleteImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf">PDF File</Label>
            <Input
              id="pdf"
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
              className="mt-1"
            />
            {pdf && (
              <div className="mt-2 text-sm text-gray-600">
                Selected PDF: {pdf.name}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">External Link</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={handleLinkChange}
              placeholder="https://example.com"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
