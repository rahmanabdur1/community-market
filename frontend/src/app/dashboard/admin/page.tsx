"use client"
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for demonstration
const mockData = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Vendor",
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-22",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      joinDate: "2024-01-20",
      lastActive: "2024-01-22",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Vendor",
      status: "Suspended",
      joinDate: "2024-01-10",
      lastActive: "2024-01-18",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Vendor",
      status: "Pending Verification",
      joinDate: "2024-01-22",
      lastActive: "2024-01-22",
    },
  ],

  listings: [
    {
      id: 1,
      title: "Premium Fishing Gear",
      vendor: "John Doe",
      category: "Gear Rentals",
      status: "Approved",
      date: "2024-01-18",
      price: "$50/day",
    },
    {
      id: 2,
      title: "Private Pond Access",
      vendor: "Mike Johnson",
      category: "Pond Owners",
      status: "Pending",
      date: "2024-01-22",
      price: "$75/day",
    },
    {
      id: 3,
      title: "Fishing Guide Service",
      vendor: "Sarah Wilson",
      category: "Guide",
      status: "Rejected",
      date: "2024-01-19",
      price: "$120/day",
    },
    {
      id: 4,
      title: "Fishing Techniques Blog",
      vendor: "Bob Fisher",
      category: "Bloggers/Trainers",
      status: "Approved",
      date: "2024-01-21",
      price: "$25/session",
    },
  ],

  posts: [
    {
      id: 1,
      title: "Great catch today!",
      author: "Jane Smith",
      type: "Community Post",
      status: "Approved",
      date: "2024-01-21",
      likes: 15,
      comments: 3,
    },
    {
      id: 2,
      title: "Fishing tips for beginners",
      author: "John Doe",
      type: "Blog Post",
      status: "Pending",
      date: "2024-01-22",
      likes: 0,
      comments: 0,
    },
    {
      id: 3,
      title: "New gear available",
      author: "Mike Johnson",
      type: "Marketplace",
      status: "Rejected",
      date: "2024-01-20",
      likes: 0,
      comments: 0,
    },
  ],

  bookings: [
    {
      id: 1,
      user: "Jane Smith",
      vendor: "John Doe",
      service: "Gear Rental",
      amount: "$50",
      status: "Pending",
      date: "2024-01-22",
      paymentVerified: false,
    },
    {
      id: 2,
      user: "Mike Johnson",
      vendor: "Sarah Wilson",
      service: "Guide Service",
      amount: "$120",
      status: "Confirmed",
      date: "2024-01-21",
      paymentVerified: true,
    },
    {
      id: 3,
      user: "John Doe",
      vendor: "Bob Fisher",
      service: "Pond Access",
      amount: "$75",
      status: "Completed",
      date: "2024-01-20",
      paymentVerified: true,
    },
  ],

  analytics: {
    userGrowth: [
      { month: "Jan", users: 1000, growth: 12 },
      { month: "Feb", users: 1120, growth: 15 },
      { month: "Mar", users: 1247, growth: 18 },
    ],
    categoryDistribution: [
      { name: "Pond Owners", value: 35 },
      { name: "Gear Rentals", value: 25 },
      { name: "Guides", value: 20 },
      { name: "Bloggers", value: 15 },
      { name: "Others", value: 5 },
    ],
    revenue: [
      { month: "Jan", revenue: 8500 },
      { month: "Feb", revenue: 10200 },
      { month: "Mar", revenue: 12450 },
    ],
  },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [announcementDialog, setAnnouncementDialog] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementTarget, setAnnouncementTarget] = useState("all");

  const stats = {
    totalUsers: 1247,
    activeListings: 89,
    pendingApprovals: 23,
    totalRevenue: "$12,450",
    activeVendors: 156,
    pendingBookings: 12,
  };

  const recentActivities = [
    {
      type: "Booking",
      description: "New booking from Jane Smith",
      time: "2 min ago",
    },
    {
      type: "Listing",
      description: "Mike Johnson submitted new listing",
      time: "15 min ago",
    },
    {
      type: "Post",
      description: "New community post awaiting approval",
      time: "30 min ago",
    },
    {
      type: "User",
      description: "New vendor registration",
      time: "1 hour ago",
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      Active: "default",
      Suspended: "secondary",
      "Pending Verification": "warning",
      Approved: "success",
      Pending: "warning",
      Rejected: "destructive",
      Confirmed: "success",
      Completed: "outline",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const handleSendAnnouncement = () => {
    console.log("Sending announcement:", {
      text: announcementText,
      target: announcementTarget,
    });
    setAnnouncementDialog(false);
    setAnnouncementText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 dark:bg-gray-900">
      {/* Header with Quick Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage platform content, users, and transactions
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => setAnnouncementDialog(true)}>
            Send Announcement
          </Button>
          <Button variant="outline">Generate Report</Button>
          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
            <Switch
              checked={isMaintenanceMode}
              onCheckedChange={setIsMaintenanceMode}
            />
            <span className="text-sm">Maintenance</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <span className="text-muted-foreground">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <span className="text-muted-foreground">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeListings}</div>
            <p className="text-xs text-muted-foreground">+5 new today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <span className="text-muted-foreground">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-muted-foreground">💲</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Vendors
            </CardTitle>
            <span className="text-muted-foreground">🏪</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeVendors}</div>
            <p className="text-xs text-muted-foreground">Verified sellers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Bookings
            </CardTitle>
            <span className="text-muted-foreground">📅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingBookings}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "Booking"
                        ? "bg-blue-500"
                        : activity.type === "Listing"
                        ? "bg-green-500"
                        : activity.type === "Post"
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Charts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>
              User growth and category distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.analytics.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" name="Total Users" />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.analytics.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.analytics.categoryDistribution.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used admin actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16">
                    Approve Pending Listings
                  </Button>
                  <Button variant="outline" className="h-16">
                    Manage Featured Content
                  </Button>
                  <Button variant="outline" className="h-16">
                    Verify Payments
                  </Button>
                  <Button variant="outline" className="h-16">
                    Generate Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Platform health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Server Status</span>
                    <Badge variant="success">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maintenance Mode</span>
                    <Switch
                      checked={isMaintenanceMode}
                      onCheckedChange={setIsMaintenanceMode}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced User Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage all platform users and vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4 flex-wrap">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">
                      Pending Verification
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">Community User</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export Data</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            {user.status === "Active" ? "Suspend" : "Activate"}
                          </Button>
                          <Button variant="outline" size="sm">
                            Reset Password
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Content Moderation Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Community Posts Moderation</CardTitle>
                <CardDescription>
                  Approve or reject user-generated content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.type}</TableCell>
                        <TableCell>{getStatusBadge(post.status)}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Content Management</CardTitle>
                <CardDescription>
                  Manage featured listings and posts on homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Currently Featured</h3>
                    <Button>Add Featured Content</Button>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            Featured Content {item}
                          </div>
                          <div className="text-sm text-gray-600">
                            Promoted listing/post
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Listings Management Tab */}
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Listings Management</CardTitle>
              <CardDescription>
                Manage all marketplace listings and categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input placeholder="Search listings..." className="max-w-sm" />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="pond-owners">Pond Owners</SelectItem>
                    <SelectItem value="spot-listers">Spot Listers</SelectItem>
                    <SelectItem value="gear-rentals">Gear Rentals</SelectItem>
                    <SelectItem value="bloggers">Bloggers/Trainers</SelectItem>
                    <SelectItem value="guides">Guides</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export Listings</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">
                        {listing.title}
                      </TableCell>
                      <TableCell>{listing.vendor}</TableCell>
                      <TableCell>{listing.category}</TableCell>
                      <TableCell>{listing.price}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
                      <TableCell>{listing.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            {listing.status === "Approved"
                              ? "Unfeature"
                              : "Feature"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Bookings & Payments Tab */}
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings & Payments Management</CardTitle>
              <CardDescription>
                Track bookings and verify manual payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Verified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        #{booking.id}
                      </TableCell>
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{booking.vendor}</TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.paymentVerified ? "success" : "warning"
                          }
                        >
                          {booking.paymentVerified ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Verify Payment
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Payment Verification</DialogTitle>
                              <DialogDescription>
                                Verify manual payment for booking #{booking.id}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>
                                <strong>User:</strong> {booking.user}
                              </p>
                              <p>
                                <strong>Vendor:</strong> {booking.vendor}
                              </p>
                              <p>
                                <strong>Service:</strong> {booking.service}
                              </p>
                              <p>
                                <strong>Amount:</strong> {booking.amount}
                              </p>
                              <DialogFooter>
                                <Button variant="outline">
                                  Reject Payment
                                </Button>
                                <Button>Confirm Payment</Button>
                              </DialogFooter>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Platform revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.analytics.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performance Metrics</CardTitle>
                <CardDescription>Key platform indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold">1,247</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-gray-600">
                        Active Listings
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-sm text-gray-600">Daily Posts</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold">$12,450</div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Manage platform-wide configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Categories Management</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Pond Owners",
                      "Spot Listers",
                      "Gear Rentals",
                      "Bloggers/Trainers",
                      "Guide",
                      "Others",
                    ].map((category) => (
                      <div
                        key={category}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <span>{category}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-3">Add New Category</Button>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">System Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Maintenance Mode</p>
                        <p className="text-sm text-gray-600">
                          Put the platform in maintenance mode
                        </p>
                      </div>
                      <Switch
                        checked={isMaintenanceMode}
                        onCheckedChange={setIsMaintenanceMode}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-approve Listings</p>
                        <p className="text-sm text-gray-600">
                          Automatically approve new listings
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications & Announcements</CardTitle>
              <CardDescription>
                Manage platform notifications and send announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">
                    Send Platform Announcement
                  </h3>
                  <div className="space-y-4">
                    <Select
                      value={announcementTarget}
                      onValueChange={setAnnouncementTarget}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="vendors">Vendors Only</SelectItem>
                        <SelectItem value="community">
                          Community Members Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Enter your announcement message..."
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleSendAnnouncement}>
                      Send Announcement
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Notification Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>New User Registrations</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pending Content Approvals</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Booking Requests</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Announcement Dialog */}
      <Dialog open={announcementDialog} onOpenChange={setAnnouncementDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Platform Announcement</DialogTitle>
            <DialogDescription>
              Create and send an announcement to platform users
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select
              value={announcementTarget}
              onValueChange={setAnnouncementTarget}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="vendors">Vendors Only</SelectItem>
                <SelectItem value="community">
                  Community Members Only
                </SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Enter your announcement message..."
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAnnouncementDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendAnnouncement}>Send Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
