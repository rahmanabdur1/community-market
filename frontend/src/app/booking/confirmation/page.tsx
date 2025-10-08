"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Download,
} from "lucide-react";
import { format } from "date-fns";

interface BookingData {
  id: string;
  listing: {
    title: string;
    price: number;
    category: string;
    location: string;
  };
  vendor: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  date: Date;
  guests: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "rejected";
  message?: string;
}

export default function BookingConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get booking details
    const fetchBooking = async () => {
      setLoading(true);

      // Mock booking data - in real app, fetch using booking ID from URL params
      const mockBooking: BookingData = {
        id: "BK" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        listing: {
          title: "Premium Fishing Gear Rental",
          price: 35,
          category: "Gear Rentals",
          location: "Lake City, CA",
        },
        vendor: {
          name: "LakeSide Fishing Gear",
          email: "contact@lakesidegear.com",
          phone: "+1 (555) 123-4567",
          avatar: "/vendors/lakeside.jpg",
        },
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        guests: 2,
        totalAmount: 70,
        status: "pending",
        message: "Looking to rent for weekend fishing trip with my brother.",
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBooking(mockBooking);
      setLoading(false);
    };

    fetchBooking();
  }, []);

  const handleDownloadInvoice = () => {
    // Implement invoice download logic
    console.log("Downloading invoice for booking:", booking?.id);
  };

  const handleContactVendor = () => {
    // Implement contact vendor logic
    console.log("Contacting vendor:", booking?.vendor.name);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">
            The booking you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">✓</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Request Sent!</h1>
          <p className="text-gray-600 text-lg">
            Your booking request has been submitted successfully
          </p>
          <Badge className="mt-3 bg-blue-100 text-blue-800">
            Booking ID: {booking.id}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.listing.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {booking.listing.category}
                      </Badge>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      ${booking.totalAmount}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{format(booking.date, "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>
                        {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{booking.listing.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Full day</span>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">
                        Your Message to Vendor
                      </h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {booking.message}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  What Happens Next?
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Vendor Review</h4>
                      <p className="text-sm text-gray-600">
                        The vendor will review your request and confirm
                        availability
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Payment Instructions</h4>
                      <p className="text-sm text-gray-600">
                        You'll receive manual payment instructions from the
                        vendor
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Confirmation</h4>
                      <p className="text-sm text-gray-600">
                        Once payment is verified, your booking will be confirmed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Vendor Info & Actions */}
          <div className="space-y-6">
            {/* Vendor Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Vendor Information</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={booking.vendor.avatar} />
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{booking.vendor.name}</p>
                    <Badge variant="success" className="text-xs">
                      Verified Vendor
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{booking.vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{booking.vendor.phone}</span>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={handleContactVendor}>
                  Contact Vendor
                </Button>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleDownloadInvoice}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Link href="/user/bookings" className="block">
                    <Button variant="outline" className="w-full">
                      View All Bookings
                    </Button>
                  </Link>
                  <Link href="/search" className="block">
                    <Button variant="outline" className="w-full">
                      Browse More Listings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Booking Status</h3>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      booking.status === "pending"
                        ? "bg-yellow-500"
                        : booking.status === "confirmed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="capitalize font-medium">
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {booking.status === "pending" &&
                    "Waiting for vendor confirmation"}
                  {booking.status === "confirmed" &&
                    "Your booking has been confirmed"}
                  {booking.status === "rejected" && "Booking was not available"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
