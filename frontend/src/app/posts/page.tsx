"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Image,
  Smile,
  Send,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
} from "lucide-react";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  category: string;
}

export default function CommunityPosts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "John Fisher",
        avatar: "/avatars/john.jpg",
        location: "Lake City",
      },
      content:
        "Amazing catch today at Lake Serene! 12lb bass on a spinner bait. What a fight! 🎣",
      image: "/posts/bass-catch.jpg",
      likes: 24,
      comments: 8,
      timestamp: "2 hours ago",
      liked: false,
      category: "recent-catches",
    },
    {
      id: 2,
      author: {
        name: "Sarah Angler",
        avatar: "/avatars/sarah.jpg",
        location: "River Creek",
      },
      content:
        "Sharing my top 3 fishing spots for beginners in the area. Perfect for weekend trips!",
      likes: 15,
      comments: 5,
      timestamp: "5 hours ago",
      liked: true,
      category: "fishing-spots",
    },
    {
      id: 3,
      author: {
        name: "Mike Waters",
        avatar: "/avatars/mike.jpg",
        location: "Mountain View",
      },
      content:
        "Just tried this new fly fishing technique and the results were incredible! Trout were jumping like crazy.",
      image: "/posts/fly-fishing.jpg",
      likes: 32,
      comments: 12,
      timestamp: "1 day ago",
      liked: false,
      category: "techniques",
    },
  ]);

  const [newPost, setNewPost] = useState({
    content: "",
    category: "general",
    image: "",
  });
  const [showCreatePost, setShowCreatePost] = useState(false);

  const categories = [
    { value: "recent-catches", label: "Recent Catches" },
    { value: "fishing-spots", label: "Fishing Spots" },
    { value: "techniques", label: "Techniques" },
    { value: "gear-reviews", label: "Gear Reviews" },
    { value: "questions", label: "Questions" },
    { value: "general", label: "General" },
  ];

  const handleCreatePost = () => {
    if (!newPost.content.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      author: {
        name: "You", // Current user
        avatar: "/avatars/current-user.jpg",
        location: "Your Location",
      },
      content: newPost.content,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      liked: false,
      category: newPost.category,
    };

    setPosts([post, ...posts]);
    setNewPost({ content: "", category: "general", image: "" });
    setShowCreatePost(false);
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      "recent-catches": { label: "Recent Catch", variant: "success" as const },
      "fishing-spots": { label: "Fishing Spot", variant: "blue" as const },
      techniques: { label: "Technique", variant: "purple" as const },
      "gear-reviews": { label: "Gear Review", variant: "orange" as const },
      questions: { label: "Question", variant: "yellow" as const },
      general: { label: "General", variant: "outline" as const },
    };

    const config =
      categoryConfig[category as keyof typeof categoryConfig] ||
      categoryConfig.general;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community Feed</h1>
            <p className="text-gray-600">
              Share your fishing experiences and connect with anglers
            </p>
          </div>
          <Button onClick={() => setShowCreatePost(true)}>Create Post</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post Card */}
            {showCreatePost && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Create Post</h3>
                  <div className="space-y-4">
                    <Select
                      value={newPost.category}
                      onValueChange={(value) =>
                        setNewPost({ ...newPost, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder="Share your fishing experience, ask a question, or post a recent catch..."
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      rows={4}
                    />

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Image className="h-4 w-4 mr-1" />
                          Image
                        </Button>
                        <Button variant="outline" size="sm">
                          <Smile className="h-4 w-4 mr-1" />
                          Emoji
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowCreatePost(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreatePost}
                          disabled={!newPost.content.trim()}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">
                              {post.author.name}
                            </h4>
                            {getCategoryBadge(post.category)}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-3 w-3" />
                            <span>{post.author.location}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-800 mb-4 whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gray-200 flex items-center justify-center">
                          <span className="text-4xl">🖼️</span>
                        </div>
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>

                    {/* Engagement Actions */}
                    <div className="flex border-t pt-3">
                      <Button
                        variant="ghost"
                        className={`flex-1 ${post.liked ? "text-red-500" : ""}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${
                            post.liked ? "fill-current" : ""
                          }`}
                        />
                        Like
                      </Button>
                      <Button variant="ghost" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                      <Button variant="ghost" className="flex-1">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>

                    {/* Comment Input */}
                    <div className="flex gap-2 mt-3">
                      <Input placeholder="Write a comment..." />
                      <Button variant="outline">Post</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories Filter */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{category.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Community Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Posts</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Members</span>
                    <span className="font-semibold">589</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Week</span>
                    <span className="font-semibold">84 posts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
