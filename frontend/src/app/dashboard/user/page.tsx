
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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Mock data for demonstration
const mockData = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/john.jpg",
    bio: "Fishing enthusiast with 5 years of experience. Love exploring new spots!",
    location: "Lake City",
    skills: ["Freshwater Fishing", "Fly Fishing", "Boat Handling"],
    joinDate: "2024-01-15",
  },

  featuredListings: [
    {
      id: 1,
      title: "Premium Fishing Gear Rental",
      vendor: "FishPro Gear",
      category: "Gear Rentals",
      price: "$35/day",
      location: "Lake City",
      image: "/listings/gear-rental.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Private Trout Pond Access",
      vendor: "Trout Haven",
      category: "Pond Owners",
      price: "$50/day",
      location: "Mountain View",
      image: "/listings/trout-pond.jpg",
      featured: true,
    },
  ],

  recentPosts: [
    {
      id: 1,
      author: "Jane Smith",
      avatar: "/avatars/jane.jpg",
      content:
        "Amazing catch today at Lake Serene! 12lb bass on a spinner bait.",
      image: "/posts/bass-catch.jpg",
      location: "Lake Serene",
      likes: 24,
      comments: 8,
      timestamp: "2 hours ago",
      liked: false,
    },
    {
      id: 2,
      author: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
      content: "Sharing my top 3 fishing spots for beginners in the area.",
      image: "/posts/fishing-spots.jpg",
      location: "River Creek",
      likes: 15,
      comments: 5,
      timestamp: "5 hours ago",
      liked: true,
    },
  ],

  aiSuggestions: [
    {
      id: 1,
      type: "post",
      title: "Similar fishing techniques you might like",
      reason: "Based on your interest in bass fishing",
    },
    {
      id: 2,
      type: "listing",
      title: "Bass fishing guide service",
      reason: "Matches your skill level and location",
    },
  ],

  categories: [
    "Pond Owners",
    "Spot Listers",
    "Gear Rentals",
    "Bloggers/Trainers",
    "Guides",
    "Others",
  ],

  bookings: [
    {
      id: 1,
      listing: "Premium Fishing Gear Rental",
      vendor: "FishPro Gear",
      date: "2024-01-25",
      amount: "$70",
      status: "Confirmed",
      paymentVerified: true,
    },
    {
      id: 2,
      listing: "Fly Fishing Lesson",
      vendor: "Angler Academy",
      date: "2024-01-28",
      amount: "$120",
      status: "Pending",
      paymentVerified: false,
    },
  ],

  marketplaceListings: [
    {
      id: 1,
      title: "Weekend Fishing Guide",
      vendor: "Pro Guides LLC",
      category: "Guides",
      price: "$150/day",
      location: "Lake District",
      rating: 4.8,
      available: true,
    },
    {
      id: 2,
      title: "Fishing Kayak Rental",
      vendor: "Water Sports Rentals",
      category: "Gear Rentals",
      price: "$45/day",
      location: "River City",
      rating: 4.5,
      available: true,
    },
  ],
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [createPostDialog, setCreatePostDialog] = useState(false);
  const [newPost, setNewPost] = useState({
    image: "",
    caption: "",
    location: "",
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      message: "Your gear rental booking has been confirmed",
      read: false,
      timestamp: "10 min ago",
    },
    {
      id: 2,
      type: "post",
      message: "Mike liked your recent catch post",
      read: true,
      timestamp: "1 hour ago",
    },
  ]);

  const handleLikePost = (postId) => {
    // Toggle like functionality
    console.log("Liked post:", postId);
  };

  const handleCreatePost = () => {
    console.log("Creating post:", newPost);
    setCreatePostDialog(false);
    setNewPost({ image: "", caption: "", location: "" });
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                FishCommunity
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search listings, posts, vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <span className="absolute left-3 top-2.5">🔍</span>
              </div>
            </div>

            {/* Notifications & Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <span>🔔</span>
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </div>
              <Avatar>
                <AvatarImage src={mockData.user.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Content with Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Navigation Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <TabsList className="grid w-full grid-cols-6 p-2">
              <TabsTrigger value="home" className="flex items-center gap-2">
                <span>🏠</span> Home
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <span>👤</span> Profile
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="flex items-center gap-2"
              >
                <span>👥</span> Community
              </TabsTrigger>
              <TabsTrigger
                value="marketplace"
                className="flex items-center gap-2"
              >
                <span>🛒</span> Marketplace
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <span>📅</span> Bookings
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <span>🔔</span> Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => setCreatePostDialog(true)}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">📝</span>
                Create Post
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab("marketplace")}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">🛒</span>
                Browse Marketplace
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab("bookings")}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">📅</span>
                View Bookings
              </Button>
            </div>

            {/* Featured Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Listings</CardTitle>
                <CardDescription>
                  Curated marketplace highlights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockData.featuredListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🎣</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{listing.title}</h3>
                          <p className="text-sm text-gray-600">
                            {listing.vendor} • {listing.location}
                          </p>
                          <p className="text-lg font-bold text-green-600">
                            {listing.price}
                          </p>
                          <Badge variant="secondary">{listing.category}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Community Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Community Posts</CardTitle>
                <CardDescription>
                  Latest catches and discussions from the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>
                            {post.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.author}</h4>
                            <span className="text-sm text-gray-500">
                              • {post.timestamp}
                            </span>
                            <Badge variant="outline">{post.location}</Badge>
                          </div>
                          <p className="mt-2">{post.content}</p>
                          <div className="flex gap-4 mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikePost(post.id)}
                              className={post.liked ? "text-red-500" : ""}
                            >
                              ❤️ {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              💬 {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm">
                              🔄 Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Suggestions</CardTitle>
                <CardDescription>
                  AI-recommended content based on your interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockData.aiSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20"
                    >
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {suggestion.reason}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Explore
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={mockData.user.avatar} />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <Input defaultValue={mockData.user.name} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          defaultValue={mockData.user.email}
                          type="email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea
                        defaultValue={mockData.user.bio}
                        placeholder="Tell us about yourself and your fishing experience..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        defaultValue={mockData.user.location}
                        placeholder="Your city or area"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Skills & Interests
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {mockData.user.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm">
                          + Add Skill
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button>Save Changes</Button>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Activity */}
            <Card>
              <CardHeader>
                <CardTitle>My Activity</CardTitle>
                <CardDescription>
                  Your recent posts and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentPosts
                    .filter((post) => post.author === mockData.user.name)
                    .map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <p>{post.content}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Community Feed</h2>
                <p className="text-gray-600">
                  Connect with fellow fishing enthusiasts
                </p>
              </div>
              <Button onClick={() => setCreatePostDialog(true)}>
                📝 Create Post
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="catches">Recent Catches</SelectItem>
                  <SelectItem value="tips">Fishing Tips</SelectItem>
                  <SelectItem value="spots">Fishing Spots</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="max-w-xs"
              />
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {mockData.recentPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          <span className="text-sm text-gray-500">
                            • {post.timestamp}
                          </span>
                          <Badge variant="outline">{post.location}</Badge>
                        </div>
                        <p className="mt-2 text-lg">{post.content}</p>

                        {/* Post Image */}
                        {post.image && (
                          <div className="mt-3 w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🖼️</span>
                          </div>
                        )}

                        {/* Engagement */}
                        <div className="flex gap-4 mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                            className={post.liked ? "text-red-500" : ""}
                          >
                            ❤️ Like ({post.likes})
                          </Button>
                          <Button variant="ghost" size="sm">
                            💬 Comment ({post.comments})
                          </Button>
                          <Button variant="ghost" size="sm">
                            🔄 Share
                          </Button>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-3 space-y-2">
                          <div className="flex gap-2">
                            <Input placeholder="Write a comment..." />
                            <Button variant="outline">Post</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Marketplace</h2>
                <p className="text-gray-600">
                  Find fishing gear, guides, and services
                </p>
              </div>
            </div>

            {/* Marketplace Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {mockData.categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50">$0 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-200">$100 - $200</SelectItem>
                      <SelectItem value="200+">$200+</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.marketplaceListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-4xl">🎣</span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">
                          {listing.title}
                        </h3>
                        <Badge
                          variant={listing.available ? "success" : "secondary"}
                        >
                          {listing.available ? "Available" : "Booked"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {listing.vendor} • {listing.location}
                      </p>
                      <p className="text-xl font-bold text-green-600 mb-3">
                        {listing.price}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{listing.category}</Badge>
                        <span className="text-sm text-yellow-600">
                          ⭐ {listing.rating}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1">Contact Vendor</Button>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings & Transactions</CardTitle>
                <CardDescription>
                  Manage your bookings and track payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{booking.listing}</h4>
                          <p className="text-gray-600">
                            Vendor: {booking.vendor}
                          </p>
                          <p className="text-sm text-gray-500">
                            Date: {booking.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              booking.status === "Confirmed"
                                ? "success"
                                : booking.status === "Pending"
                                ? "warning"
                                : "secondary"
                            }
                          >
                            {booking.status}
                          </Badge>
                          <p className="text-lg font-bold mt-1">
                            {booking.amount}
                          </p>
                          <p className="text-sm text-gray-500">
                            Payment:{" "}
                            {booking.paymentVerified ? "Verified" : "Pending"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Vendor
                        </Button>
                        {!booking.paymentVerified && (
                          <Button size="sm">Upload Payment Proof</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Stay updated with your activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.read
                          ? "bg-gray-50"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p
                            className={
                              notification.read
                                ? "text-gray-700"
                                : "font-semibold"
                            }
                          >
                            {notification.message}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.timestamp}
                          </p>
                        </div>
                        {!notification.read && (
                          <Button variant="ghost" size="sm">
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={createPostDialog} onOpenChange={setCreatePostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Share your fishing experience with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mt-1">
                <span className="text-4xl">📷</span>
                <p className="text-gray-600">
                  Click to upload or drag and drop
                </p>
                <Button variant="outline" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Caption</label>
              <Textarea
                placeholder="What's on your mind? Share your catch or fishing tips..."
                value={newPost.caption}
                onChange={(e) =>
                  setNewPost({ ...newPost, caption: e.target.value })
                }
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Where did you fish?"
                value={newPost.location}
                onChange={(e) =>
                  setNewPost({ ...newPost, location: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreatePostDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>Post to Community</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
