"use client";

import { useContent } from "@/lib/content/content.context";
import { useAuth } from "@/lib/auth/auth.context";
import { apiClient } from "@/lib/api/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  Link2,
  BookOpen,
  Users,
  FileText,
  Image,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  const { content } = useContent();
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    news: 0,
    links: 0,
    laws: 0,
    users: 0,
    documents: 0,
    media: 0,
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
      return;
    }

    // Fetch stats
    const fetchStats = async () => {
      try {
        const [news, links, laws, users, documents, media] = await Promise.all([
          apiClient.listPosts(),
          apiClient.getContent(),
          apiClient.getContent(),
          apiClient.getUsers(),
          apiClient.getContent(),
          apiClient.getContent(),
        ]);

        setStats({
          news: Object.keys(news || {}).length,
          links: Object.keys(links?.links || {}).length,
          laws: Object.keys(laws?.laws || {}).length,
          users: users.length,
          documents: Object.keys(documents?.documents || {}).length,
          media: Object.keys(media?.media || {}).length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [isAdmin, router]);

  const quickActions = [
    {
      title: "Add News",
      icon: Newspaper,
      href: "/admin/news/new",
    },
    {
      title: "Add Link",
      icon: Link2,
      href: "/admin/links/new",
    },
    {
      title: "Add Law",
      icon: BookOpen,
      href: "/admin/laws/new",
    },
    {
      title: "Add User",
      icon: Users,
      href: "/admin/users/new",
    },
    {
      title: "Add Document",
      icon: FileText,
      href: "/admin/documents/new",
    },
    {
      title: "Add Media",
      icon: Image,
      href: "/admin/media/new",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>News</CardTitle>
            <CardDescription>Manage news articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{stats.news}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/news")}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
            <CardDescription>Manage website links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{stats.links}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/links")}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Laws</CardTitle>
            <CardDescription>Manage laws and regulations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{stats.laws}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/laws")}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{stats.users}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/users")}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Manage documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{stats.documents}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/documents")}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>Manage media files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{stats.media}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/media")}
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => router.push(action.href)}
          >
            <action.icon className="w-6 h-6" />
            <span>{action.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
