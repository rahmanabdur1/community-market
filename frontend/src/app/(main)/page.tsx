"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, Filter, X } from "lucide-react";

interface Listing {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  image: string;
  rating: number;
  maxGuests: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Filters {
  location: string;
  guests: number;
  categories: string[];
  priceRange: [number, number];
  availability: boolean;
  rating: number;
}

export default function Homepage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<Filters>({
    location: "",
    guests: 1,
    categories: [],
    priceRange: [0, 500],
    availability: true,
    rating: 0,
  });

  const categories: Category[] = [
    { id: "pond-owners", name: "Pond Owners", icon: "🏞️" },
    { id: "spot-listers", name: "Spot Listers", icon: "📍" },
    { id: "gear-rentals", name: "Gear Rentals", icon: "🎣" },
    { id: "bloggers-trainers", name: "Bloggers/Trainers", icon: "📚" },
    { id: "guides", name: "Guides", icon: "🧭" },
    { id: "helpers", name: "Helper Guides", icon: "👥" },
    { id: "others", name: "Others", icon: "🔧" },
  ];

  const priceRanges = [
    { label: "Any price", value: "0-1000" },
    { label: "Under $25", value: "0-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Over $200", value: "200-1000" },
  ];

  const featuredListings: Listing[] = [
    {
      id: 1,
      title: "Premium Fishing Gear Rental",
      category: "gear-rentals",
      price: 35,
      location: "Lake City",
      image: "/listings/gear-rental.jpg",
      rating: 4.8,
      maxGuests: 4,
    },
    {
      id: 2,
      title: "Private Trout Pond Access",
      category: "pond-owners",
      price: 50,
      location: "Mountain View",
      image: "/listings/trout-pond.jpg",
      rating: 4.9,
      maxGuests: 6,
    },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number],
    }));
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      q: searchTerm,
      guests: filters.guests.toString(),
      price_min: filters.priceRange[0].toString(),
      price_max: filters.priceRange[1].toString(),
      categories: filters.categories.join(","),
      availability: filters.availability.toString(),
    });

    if (selectedDate) {
      searchParams.append("date", selectedDate.toISOString());
    }
    if (filters.location) {
      searchParams.append("location", filters.location);
    }

    router.push(`/search?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      guests: 1,
      categories: [],
      priceRange: [0, 500],
      availability: true,
      rating: 0,
    });
    setSelectedDate(null);
    setSearchTerm("");
  };

  const getActiveFiltersCount = (): number => {
    let count = 0;
    if (filters.location) count++;
    if (filters.guests > 1) count++;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++;
    if (selectedDate) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">
              Discover Fishing Adventures
            </h1>
            <p className="text-xl">
              Book fishing spots, rent gear, hire guides, and join the community
            </p>
          </div>

          {/* Main Search Container */}
          <Card className="max-w-6xl mx-auto">
            <CardContent className="p-6">
              {/* Quick Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="What are you looking for? (fishing spots, gear, guides...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-gray-900 h-12"
                    />
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-12 justify-start">
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

                  <Select
                    value={filters.guests.toString()}
                    onValueChange={(value) =>
                      setFilters({ ...filters, guests: parseInt(value) })
                    }
                  >
                    <SelectTrigger className="h-12 w-32">
                      <Users className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "guest" : "guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    variant="outline"
                    className="h-12 relative"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </Button>

                  <Button
                    className="h-12 bg-orange-500 hover:bg-orange-600"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="border-t pt-4 space-y-4">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900">
                      Nearby Location
                    </label>
                    <Input
                      placeholder="Enter city, zip code, or area"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                      className="max-w-md"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900">
                      Service Types
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={
                            filters.categories.includes(category.id)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer px-3 py-1"
                          onClick={() => handleCategoryToggle(category.id)}
                        >
                          <span className="mr-1">{category.icon}</span>
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900">
                      Price Range: ${filters.priceRange[0]} - $
                      {filters.priceRange[1]}
                    </label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={handlePriceRangeChange}
                      max={500}
                      step={10}
                      className="max-w-md"
                    />
                    <div className="flex justify-between text-sm text-gray-600 max-w-md">
                      <span>$0</span>
                      <span>$500+</span>
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="text-red-600"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear all filters
                    </Button>
                    <Button onClick={handleSearch}>Apply Filters</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <Link href="/search">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <Card
                key={listing.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center relative">
                    <span className="text-4xl">🎣</span>
                    <Badge className="absolute top-2 right-2">
                      {categories.find((c) => c.id === listing.category)?.icon}
                      {categories.find((c) => c.id === listing.category)?.name}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {listing.title}
                    </h3>
                    <p className="text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-green-600">
                        ${listing.price}
                      </span>
                      <span className="text-yellow-600">
                        ⭐ {listing.rating}
                      </span>
                    </div>
                    <Link href={`/listing/${listing.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
