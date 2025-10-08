"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Star, Filter, X, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface SearchResult {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  rating: number;
  description: string;
  image: string;
  maxGuests: number;
  isAvailable: boolean;
}

interface Filters {
  categories: string[];
  priceRange: [number, number];
  location: string;
  guests: number;
  date: Date | null;
  availability: boolean;
  minRating: number;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 500],
    location: "",
    guests: 1,
    date: null,
    availability: true,
    minRating: 0,
  });

  const query = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialCategories = searchParams.get("categories")?.split(",") || [];
  const initialPriceMin = parseInt(searchParams.get("price_min") || "0");
  const initialPriceMax = parseInt(searchParams.get("price_max") || "500");
  const initialGuests = parseInt(searchParams.get("guests") || "1");

  const categories = [
    { id: "pond-owners", name: "Pond Owners", icon: "🏞️" },
    { id: "spot-listers", name: "Spot Listers", icon: "📍" },
    { id: "gear-rentals", name: "Gear Rentals", icon: "🎣" },
    { id: "bloggers-trainers", name: "Bloggers/Trainers", icon: "📚" },
    { id: "guides", name: "Guides", icon: "🧭" },
    { id: "helpers", name: "Helper Guides", icon: "👥" },
    { id: "others", name: "Others", icon: "🔧" },
  ];

  // Mock data - replace with actual API call
  const mockResults: SearchResult[] = [
    {
      id: 1,
      title: "Premium Fishing Gear Rental",
      category: "gear-rentals",
      price: 35,
      location: "Lake City",
      rating: 4.8,
      description:
        "High-quality fishing rods and reels for rent. Perfect for both beginners and experienced anglers.",
      image: "/listings/gear-rental.jpg",
      maxGuests: 4,
      isAvailable: true,
    },
    {
      id: 2,
      title: "Private Trout Pond Access",
      category: "pond-owners",
      price: 50,
      location: "Mountain View",
      rating: 4.9,
      description:
        "Exclusive access to private trout fishing pond with stunning mountain views.",
      image: "/listings/trout-pond.jpg",
      maxGuests: 6,
      isAvailable: true,
    },
    {
      id: 3,
      title: "Expert Fishing Guide Service",
      category: "guides",
      price: 120,
      location: "River Side",
      rating: 4.7,
      description:
        "Professional fishing guide with 10+ years experience. All equipment provided.",
      image: "/listings/fishing-guide.jpg",
      maxGuests: 2,
      isAvailable: true,
    },
    {
      id: 4,
      title: "Fishing Kayak Rental",
      category: "gear-rentals",
      price: 45,
      location: "Lake City",
      rating: 4.5,
      description:
        "Stable fishing kayaks perfect for lake exploration. Life jackets included.",
      image: "/listings/kayak-rental.jpg",
      maxGuests: 1,
      isAvailable: false,
    },
    {
      id: 5,
      title: "Bass Fishing Spot Location",
      category: "spot-listers",
      price: 25,
      location: "Forest Lake",
      rating: 4.6,
      description:
        "Secret bass fishing spots with detailed maps and best times to fish.",
      image: "/listings/bass-spots.jpg",
      maxGuests: 1,
      isAvailable: true,
    },
    {
      id: 6,
      title: "Fly Fishing Lessons",
      category: "bloggers-trainers",
      price: 80,
      location: "Crystal River",
      rating: 4.9,
      description:
        "Learn fly fishing techniques from certified instructor. All levels welcome.",
      image: "/listings/fly-fishing.jpg",
      maxGuests: 3,
      isAvailable: true,
    },
  ];

  useEffect(() => {
    // Initialize filters from URL params
    setFilters({
      categories: initialCategories,
      priceRange: [initialPriceMin, initialPriceMax],
      location: initialLocation,
      guests: initialGuests,
      date: null,
      availability: true,
      minRating: 0,
    });

    // Simulate API call
    const fetchResults = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      setResults(mockResults);
      setLoading(false);
    };

    fetchResults();
  }, [searchParams]);

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

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      location: "",
      guests: 1,
      date: null,
      availability: true,
      minRating: 0,
    });
  };

  const getActiveFiltersCount = (): number => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++;
    if (filters.location) count++;
    if (filters.guests > 1) count++;
    if (filters.date) count++;
    if (filters.minRating > 0) count++;
    return count;
  };

  const filteredResults = results.filter((item) => {
    // Category filter
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(item.category)
    ) {
      return false;
    }

    // Price filter
    if (
      item.price < filters.priceRange[0] ||
      item.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      !item.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Guests filter
    if (filters.guests > item.maxGuests) {
      return false;
    }

    // Availability filter
    if (filters.availability && !item.isAvailable) {
      return false;
    }

    // Rating filter
    if (item.rating < filters.minRating) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Finding the best fishing spots...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {query ? `"${query}"` : "All Listings"}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredResults.length}{" "}
              {filteredResults.length === 1 ? "listing" : "listings"} found
              {getActiveFiltersCount() > 0 &&
                ` • ${getActiveFiltersCount()} active filter${
                  getActiveFiltersCount() > 1 ? "s" : ""
                }`}
            </p>
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-red-600"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">Filters</h3>
                </div>

                <div className="space-y-6">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Location
                    </label>
                    <Input
                      placeholder="City, area, or zip code"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                    />
                  </div>

                  {/* Date Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.date
                            ? format(filters.date, "MMM dd, yyyy")
                            : "Any date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.date}
                          onSelect={(date) =>
                            setFilters({ ...filters, date: date || null })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Guests
                    </label>
                    <Select
                      value={filters.guests.toString()}
                      onValueChange={(value) =>
                        setFilters({ ...filters, guests: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "guest" : "guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Categories Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Service Types
                    </label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            checked={filters.categories.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="rounded border-gray-300"
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm cursor-pointer flex items-center gap-2"
                          >
                            <span>{category.icon}</span>
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Price Range: ${filters.priceRange[0]} - $
                      {filters.priceRange[1]}
                    </label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={handlePriceRangeChange}
                      max={500}
                      step={10}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>$0</span>
                      <span>$500+</span>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Minimum Rating
                    </label>
                    <Select
                      value={filters.minRating.toString()}
                      onValueChange={(value) =>
                        setFilters({ ...filters, minRating: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any rating</SelectItem>
                        <SelectItem value="4">⭐ 4.0+</SelectItem>
                        <SelectItem value="4.5">⭐ 4.5+</SelectItem>
                        <SelectItem value="4.8">⭐ 4.8+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Availability Filter */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Available Now</p>
                      <p className="text-xs text-gray-600">
                        Show only available listings
                      </p>
                    </div>
                    <Switch
                      checked={filters.availability}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, availability: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Sorted by: <span className="font-medium">Relevance</span>
              </div>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Grid */}
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResults.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center relative">
                        <span className="text-4xl">🎣</span>
                        {!item.isAvailable && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Badge
                              variant="secondary"
                              className="bg-white text-black"
                            >
                              Unavailable
                            </Badge>
                          </div>
                        )}
                        <Badge className="absolute top-2 left-2">
                          {categories.find((c) => c.id === item.category)?.icon}
                        </Badge>
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          ${item.price}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-2 flex items-center gap-1 text-sm">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </p>
                        <p className="text-gray-700 mb-3 text-sm line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {item.rating}
                            </span>
                          </div>
                          <span className="text-xs text-gray-600">
                            👥 {item.maxGuests} guests
                          </span>
                        </div>
                        <Link href={`/listing/${item.id}`}>
                          <Button
                            className="w-full mt-4"
                            disabled={!item.isAvailable}
                          >
                            {item.isAvailable ? "View Details" : "Unavailable"}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎣</div>
                <h3 className="text-xl font-semibold mb-2">
                  No listings found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}

            {/* Pagination */}
            {filteredResults.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" className="bg-blue-100">
                    1
                  </Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
