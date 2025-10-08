"use client"

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Button 
} from '@/components/ui/button';
import { 
  Input 
} from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Textarea 
} from '@/components/ui/textarea';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Badge 
} from '@/components/ui/badge';
import { 
  Switch 
} from '@/components/ui/switch';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Mock data for demonstration
const mockData = {
  vendor: {
    name: 'LakeSide Fishing Gear',
    email: 'contact@lakesidegear.com',
    phone: '+1 (555) 123-4567',
    avatar: '/vendors/lakeside-gear.jpg',
    bio: 'Premium fishing gear rentals and guided fishing experiences',
    location: 'Lake City',
    verificationStatus: 'Verified',
    joinDate: '2024-01-10',
    totalListings: 8,
    activeListings: 6
  },
  
  stats: {
    totalListings: 8,
    activeListings: 6,
    pendingListings: 1,
    totalBookings: 24,
    pendingBookings: 3,
    confirmedBookings: 18,
    revenue: '$2,850',
    totalViews: 1247,
    totalEngagements: 89
  },
  
  listings: [
    {
      id: 1,
      title: 'Premium Fishing Rods & Reels',
      category: 'Gear Rentals',
      price: '$35/day',
      status: 'Active',
      views: 247,
      bookings: 12,
      likes: 15,
      createdAt: '2024-01-15',
      image: '/listings/rods-reels.jpg'
    },
    {
      id: 2,
      title: 'Guided Bass Fishing Tour',
      category: 'Guide',
      price: '$120/half-day',
      status: 'Active',
      views: 189,
      bookings: 8,
      likes: 22,
      createdAt: '2024-01-18',
      image: '/listings/bass-tour.jpg'
    },
    {
      id: 3,
      title: 'Fishing Kayak Rental',
      category: 'Gear Rentals',
      price: '$45/day',
      status: 'Pending',
      views: 56,
      bookings: 0,
      likes: 3,
      createdAt: '2024-01-22',
      image: '/listings/kayak-rental.jpg'
    }
  ],
  
  addons: [
    {
      id: 1,
      name: 'Fishing Guide Service',
      attachedTo: 'Premium Fishing Rods',
      price: '$60/addon',
      status: 'Active',
      bookings: 5
    },
    {
      id: 2,
      name: 'Bait & Tackle Package',
      attachedTo: 'All Gear Rentals',
      price: '$15/addon',
      status: 'Active',
      bookings: 12
    }
  ],
  
  bookings: [
    {
      id: 1,
      user: 'John Doe',
      listing: 'Premium Fishing Rods & Reels',
      addons: ['Bait & Tackle Package'],
      date: '2024-01-25',
      amount: '$50',
      status: 'Pending',
      paymentVerified: false,
      message: 'Looking to rent for weekend fishing trip'
    },
    {
      id: 2,
      user: 'Jane Smith',
      listing: 'Guided Bass Fishing Tour',
      addons: [],
      date: '2024-01-24',
      amount: '$120',
      status: 'Confirmed',
      paymentVerified: true,
      message: 'Beginner looking for instruction'
    }
  ],
  
  messages: [
    {
      id: 1,
      user: 'Mike Johnson',
      subject: 'Question about kayak rental',
      preview: 'Do you provide life jackets with the kayak rental?',
      timestamp: '2 hours ago',
      read: false,
      bookingRelated: true
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      subject: 'Custom fishing package',
      preview: 'Interested in a full-day guided tour with gear...',
      timestamp: '1 day ago',
      read: true,
      bookingRelated: false
    }
  ],
  
  analytics: {
    views: [
      { day: 'Mon', views: 45 },
      { day: 'Tue', views: 67 },
      { day: 'Wed', views: 89 },
      { day: 'Thu', views: 76 },
      { day: 'Fri', views: 94 },
      { day: 'Sat', views: 120 },
      { day: 'Sun', views: 85 }
    ],
    bookings: [
      { month: 'Jan', bookings: 8, revenue: 960 },
      { month: 'Feb', bookings: 12, revenue: 1440 },
      { month: 'Mar', bookings: 18, revenue: 2160 }
    ],
    categoryPerformance: [
      { category: 'Gear Rentals', revenue: 1850, bookings: 15 },
      { category: 'Guided Tours', revenue: 1200, bookings: 10 },
      { category: 'Addon Services', revenue: 450, bookings: 8 }
    ]
  },
  
  quickReplyTemplates: [
    "Thank you for your inquiry! I'll get back to you shortly.",
    "The item is available on your requested dates.",
    "Please provide more details about your requirements.",
    "I've confirmed your booking request."
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [createListingDialog, setCreateListingDialog] = useState(false);
  const [addAddonDialog, setAddAddonDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newListing, setNewListing] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    location: ''
  });
  const [newAddon, setNewAddon] = useState({
    name: '',
    price: '',
    description: '',
    attachedTo: ''
  });

  const getStatusBadge = (status) => {
    const variants = {
      Active: 'success',
      Pending: 'warning',
      Confirmed: 'success',
      Rejected: 'destructive',
      Verified: 'success'
    };
    
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const handleCreateListing = () => {
    console.log('Creating listing:', newListing);
    setCreateListingDialog(false);
    setNewListing({ title: '', category: '', price: '', description: '', location: '' });
  };

  const handleAddAddon = () => {
    console.log('Adding addon:', newAddon);
    setAddAddonDialog(false);
    setNewAddon({ name: '', price: '', description: '', attachedTo: '' });
  };

  const handleBookingAction = (bookingId, action) => {
    console.log(`Booking ${bookingId}: ${action}`);
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Dashboard</h1>
            </div>
            
            {/* Vendor Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{mockData.vendor.name}</p>
                <p className="text-sm text-gray-600">{getStatusBadge(mockData.vendor.verificationStatus)}</p>
              </div>
              <Avatar>
                <AvatarImage src={mockData.vendor.avatar} />
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockData.stats.activeListings}</div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockData.stats.pendingBookings}</div>
              <div className="text-sm text-gray-600">Pending Bookings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockData.stats.confirmedBookings}</div>
              <div className="text-sm text-gray-600">Confirmed Bookings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockData.stats.revenue}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockData.stats.totalViews}</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockData.stats.totalEngagements}</div>
              <div className="text-sm text-gray-600">Engagements</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setCreateListingDialog(true)}
                      className="w-full justify-start"
                    >
                      📝 Create New Listing
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('bookings')}
                    >
                      📅 View Booking Requests
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('messages')}
                    >
                      💬 Check Messages
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      📊 Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest interactions and bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">New booking request from John Doe</p>
                        <p className="text-sm text-gray-600">Premium Fishing Rods - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Payment verified for Jane Smith</p>
                        <p className="text-sm text-gray-600">Guided Bass Fishing Tour - 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">New message from Mike Johnson</p>
                        <p className="text-sm text-gray-600">Question about kayak rental - 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Views and engagement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData.analytics.views}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">My Listings</h2>
                <p className="text-gray-600">Manage your products and services</p>
              </div>
              <Button onClick={() => setCreateListingDialog(true)}>
                + Create New Listing
              </Button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.listings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-4xl">🎣</span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        {getStatusBadge(listing.status)}
                      </div>
                      <Badge variant="outline" className="mb-2">{listing.category}</Badge>
                      <p className="text-xl font-bold text-green-600 mb-3">{listing.price}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                        <div className="text-center">
                          <div className="font-semibold">{listing.views}</div>
                          <div>Views</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{listing.bookings}</div>
                          <div>Bookings</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{listing.likes}</div>
                          <div>Likes</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        <Button variant="outline" size="sm">Duplicate</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Listings Table View */}
            <Card>
              <CardHeader>
                <CardTitle>All Listings</CardTitle>
                <CardDescription>Detailed view of your listings with analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Listing</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.title}</TableCell>
                        <TableCell>{listing.category}</TableCell>
                        <TableCell>{listing.price}</TableCell>
                        <TableCell>{getStatusBadge(listing.status)}</TableCell>
                        <TableCell>{listing.views}</TableCell>
                        <TableCell>{listing.bookings}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Stats</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add-ons Tab */}
          <TabsContent value="addons" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Add-on Services</h2>
                <p className="text-gray-600">Manage optional services and packages</p>
              </div>
              <Button onClick={() => setAddAddonDialog(true)}>
                + Add New Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockData.addons.map((addon) => (
                <Card key={addon.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      {addon.name}
                      {getStatusBadge(addon.status)}
                    </CardTitle>
                    <CardDescription>Attached to: {addon.attachedTo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-semibold">{addon.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bookings:</span>
                        <span>{addon.bookings} times</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Manage Availability</Button>
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
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>Manage and track all booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Listing</TableHead>
                      <TableHead>Add-ons</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">#{booking.id}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.listing}</TableCell>
                        <TableCell>
                          {booking.addons.length > 0 ? booking.addons.join(', ') : 'None'}
                        </TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <Badge variant={booking.paymentVerified ? "success" : "warning"}>
                            {booking.paymentVerified ? "Verified" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              View
                            </Button>
                            {booking.status === 'Pending' && (
                              <>
                                <Button size="sm" onClick={() => handleBookingAction(booking.id, 'confirm')}>
                                  Confirm
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleBookingAction(booking.id, 'reject')}>
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly booking revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockData.analytics.bookings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
                      <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Revenue distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockData.analytics.categoryPerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {mockData.analytics.categoryPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Listings</CardTitle>
                <CardDescription>Your most popular listings and services</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Listing</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.title}</TableCell>
                        <TableCell>{listing.category}</TableCell>
                        <TableCell>{listing.views}</TableCell>
                        <TableCell>{listing.bookings}</TableCell>
                        <TableCell>{((listing.bookings / listing.views) * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          ${(listing.bookings * parseInt(listing.price.replace(/[^0-9]/g, ''))).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Messages</CardTitle>
                <CardDescription>Manage inquiries and support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                        !message.read ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => setMessageDialog(true)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{message.user}</h4>
                            {message.bookingRelated && (
                              <Badge variant="outline">Booking Related</Badge>
                            )}
                            {!message.read && (
                              <Badge variant="default">New</Badge>
                            )}
                          </div>
                          <p className="font-medium text-gray-900">{message.subject}</p>
                          <p className="text-gray-600">{message.preview}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{message.timestamp}</p>
                          {!message.read && (
                            <Button variant="outline" size="sm" className="mt-2">Mark Read</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Reply Templates */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Quick Reply Templates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mockData.quickReplyTemplates.map((template, index) => (
                      <Button key={index} variant="outline" className="justify-start h-auto py-2 text-left">
                        {template}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Profile</CardTitle>
                <CardDescription>Manage your business information and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={mockData.vendor.avatar} />
                        <AvatarFallback className="text-2xl">LS</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Logo</Button>
                      <div className="text-center">
                        <p className="font-semibold">{mockData.vendor.verificationStatus}</p>
                        <p className="text-sm text-gray-600">Verification Status</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Business Name</label>
                        <Input defaultValue={mockData.vendor.name} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input defaultValue={mockData.vendor.email} type="email" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <Input defaultValue={mockData.vendor.phone} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Location</label>
                        <Input defaultValue={mockData.vendor.location} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Business Description</label>
                      <Textarea 
                        defaultValue={mockData.vendor.bio}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Notification Preferences</h4>
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Booking Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Message Notifications</span>
                        <Switch defaultChecked />
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Listing Dialog */}
      <Dialog open={createListingDialog} onOpenChange={setCreateListingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
            <DialogDescription>Add a new product or service to your offerings</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Listing Title</label>
              <Input 
                value={newListing.title}
                onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                placeholder="e.g., Premium Fishing Rod Rental"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={newListing.category} onValueChange={(value) => setNewListing({...newListing, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pond-owners">Pond Owners</SelectItem>
                  <SelectItem value="spot-listers">Spot Listers</SelectItem>
                  <SelectItem value="gear-rentals">Gear Rentals</SelectItem>
                  <SelectItem value="bloggers-trainers">Bloggers/Trainers</SelectItem>
                  <SelectItem value="guides">Guides</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input 
                value={newListing.price}
                onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                placeholder="e.g., $35/day"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input 
                value={newListing.location}
                onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                placeholder="Service location"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                placeholder="Describe your listing in detail..."
                rows={4}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Upload Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <span className="text-4xl">📷</span>
                <p className="text-gray-600">Drag and drop images or click to browse</p>
                <Button variant="outline" className="mt-2">Select Files</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateListingDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateListing}>Create Listing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Addon Dialog */}
      <Dialog open={addAddonDialog} onOpenChange={setAddAddonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>Create an additional service for your listings</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Service Name</label>
              <Input 
                value={newAddon.name}
                onChange={(e) => setNewAddon({...newAddon, name: e.target.value})}
                placeholder="e.g., Fishing Guide Service"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input 
                value={newAddon.price}
                onChange={(e) => setNewAddon({...newAddon, price: e.target.value})}
                placeholder="e.g., $60/service"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Attach to Listing</label>
              <Select value={newAddon.attachedTo} onValueChange={(value) => setNewAddon({...newAddon, attachedTo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select listing" />
                </SelectTrigger>
                <SelectContent>
                  {mockData.listings.map((listing) => (
                    <SelectItem key={listing.id} value={listing.id.toString()}>
                      {listing.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={newAddon.description}
                onChange={(e) => setNewAddon({...newAddon, description: e.target.value})}
                placeholder="Describe this service..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAddonDialog(false)}>Cancel</Button>
            <Button onClick={handleAddAddon}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorDashboard;