"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  FileText,
  Menu,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    menus: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch your actual stats from the API
        const users = await apiClient.getUsers();
        const posts = await apiClient.listPosts();
        const menus = await apiClient.listMenus();

        setStats({
          users: users.data.length,
          posts: posts.length,
          menus: menus.length,
          activeUsers: users.data.filter((user) => user.isApproved).length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">
                <ArrowUpRight className="inline h-3 w-3" /> 20%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">
                <ArrowUpRight className="inline h-3 w-3" /> 15%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Menus</CardTitle>
            <Menu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.menus}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">
                <ArrowUpRight className="inline h-3 w-3" /> 10%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">
                <ArrowDownRight className="inline h-3 w-3" /> 5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add your recent activity list here */}
              <p className="text-sm text-muted-foreground">
                No recent activity to show.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <a
                href="/admin/posts/new"
                className="text-sm text-blue-600 hover:underline"
              >
                Create New Post
              </a>
              <a
                href="/admin/menus/new"
                className="text-sm text-blue-600 hover:underline"
              >
                Create New Menu
              </a>
              <a
                href="/admin/users"
                className="text-sm text-blue-600 hover:underline"
              >
                Manage Users
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
