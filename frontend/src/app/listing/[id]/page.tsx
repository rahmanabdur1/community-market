"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Star } from "lucide-react";

interface Listing {
  id: number;
  title: string;
  category: string;
  price: string;
  location: string;
  description: string;
  features: string[];
  vendor: {
    name: string;
    avatar: string;
    rating: number;
    totalListings: number;
    joined: string;
  };
}

export default function ListingDetail() {
  const params = useParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");

  // Mock data - replace with actual API call using params.id
  const listing: Listing = {
    id: 1,
    title: "Premium Fishing Rods & Reels Rental",
    category: "Gear Rentals",
    price: "$35/day",
    location: "Lake City, CA",
    description:
      "Premium fishing gear rental including rods, reels, and basic tackle. Perfect for beginners and experienced anglers alike.",
    features: [
      "High-quality rods and reels",
      "Basic tackle included",
      "Cleaning service available",
      "Delivery option in local area",
    ],
    vendor: {
      name: "LakeSide Fishing Gear",
      avatar: "/vendors/lakeside.jpg",
      rating: 4.8,
      totalListings: 12,
      joined: "2024",
    },
  };

  const handleBookingRequest = () => {
    if (!selectedDate) return;

    const bookingData = {
      listingId: params.id,
      date: selectedDate,
      message,
    };

    console.log("Booking request:", bookingData);
    // Implement booking logic
    router.push("/booking/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-4">
                  {listing.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
                <p className="text-gray-600 mb-6 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {listing.location}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <Avatar>
                    <AvatarImage src={listing.vendor.avatar} />
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{listing.vendor.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {listing.vendor.rating} • {listing.vendor.totalListings}{" "}
                      listings
                    </p>
                  </div>
                </div>

                <p className="text-lg mb-6">{listing.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Features & Services
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {listing.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-green-600">
                    {listing.price}
                  </span>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? format(selectedDate, "MMM dd, yyyy")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message to Vendor
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any special requests or questions..."
                      rows={3}
                    />
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleBookingRequest}
                    disabled={!selectedDate}
                  >
                    Request Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
