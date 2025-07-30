"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Search,
  Filter,
  Star,
  Users,
  Building,
  Wifi,
  Car,
  CreditCard,
  Accessibility,
  Coffee,
  Shield,
  Loader2,
} from "lucide-react"

interface Branch {
  id: number
  name: string
  address: string
  city: string
  phone: string
  email: string
  manager: string
  coordinates: { lat: number; lng: number }
  hours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  services: string[]
  amenities: string[]
  rating: number
  reviews: number
  distance?: number
}

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<"pending" | "granted" | "denied">("pending")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const { toast } = useToast()

  const branchData: Branch[] = [
    {
      id: 1,
      name: "Main Branch",
      address: "Bole Sub City, Addis Ababa",
      city: "Addis Ababa",
      phone: "+251 11 123 4567",
      email: "main@gebetasaccos.com",
      manager: "Dr. Almaz Tadesse",
      coordinates: { lat: 8.9806, lng: 38.7578 },
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "9:00 AM - 1:00 PM",
        sunday: "Closed",
      },
      services: ["Savings", "Loans", "Mobile Banking", "Foreign Exchange", "Investment"],
      amenities: ["ATM", "Parking", "WiFi", "Wheelchair Access", "Coffee Shop"],
      rating: 4.8,
      reviews: 245,
    },
    {
      id: 2,
      name: "Bahir Dar Branch",
      address: "Kebele 01, Bahir Dar",
      city: "Bahir Dar",
      phone: "+251 58 220 1234",
      email: "bahirdar@gebetasaccos.com",
      manager: "Ato Dawit Mekonnen",
      coordinates: { lat: 11.5942, lng: 37.3615 },
      hours: {
        weekdays: "8:30 AM - 4:30 PM",
        saturday: "9:00 AM - 12:00 PM",
        sunday: "Closed",
      },
      services: ["Savings", "Loans", "Mobile Banking", "Money Transfer"],
      amenities: ["ATM", "Parking", "WiFi"],
      rating: 4.6,
      reviews: 128,
    },
    {
      id: 3,
      name: "Hawassa Branch",
      address: "Piassa Area, Hawassa",
      city: "Hawassa",
      phone: "+251 46 220 5678",
      email: "hawassa@gebetasaccos.com",
      manager: "W/ro Hanan Ahmed",
      coordinates: { lat: 7.0621, lng: 38.4776 },
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "9:00 AM - 1:00 PM",
        sunday: "Closed",
      },
      services: ["Savings", "Loans", "Mobile Banking", "Insurance"],
      amenities: ["ATM", "Parking", "Wheelchair Access"],
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 4,
      name: "Merkato Branch",
      address: "Merkato Area, Addis Ababa",
      city: "Addis Ababa",
      phone: "+251 11 234 5678",
      email: "merkato@gebetasaccos.com",
      manager: "Ato Solomon Bekele",
      coordinates: { lat: 9.0084, lng: 38.7438 },
      hours: {
        weekdays: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 2:00 PM",
        sunday: "Closed",
      },
      services: ["Savings", "Loans", "Mobile Banking", "Business Banking"],
      amenities: ["ATM", "Parking", "WiFi", "Security"],
      rating: 4.5,
      reviews: 167,
    },
  ]

  const cities = ["all", ...Array.from(new Set(branchData.map((branch) => branch.city)))]

  useEffect(() => {
    setBranches(branchData)
    setFilteredBranches(branchData)
  }, [])

  useEffect(() => {
    const filtered = branches.filter((branch) => {
      const matchesSearch =
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCity = selectedCity === "all" || branch.city === selectedCity
      return matchesSearch && matchesCity
    })

    // Sort branches
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return (a.distance || 0) - (b.distance || 0)
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredBranches(filtered)
  }, [branches, searchQuery, selectedCity, sortBy])

  const requestLocation = async () => {
    setIsLoadingLocation(true)

    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      })
      setLocationPermission("denied")
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(location)
        setLocationPermission("granted")
        calculateDistances(location)
        toast({
          title: "Location access granted",
          description: "Branches are now sorted by distance from your location.",
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        setLocationPermission("denied")
        setIsLoadingLocation(false)
        let message = "Unable to access your location."

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location access denied. Please enable location services."
            break
          case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable."
            break
          case error.TIMEOUT:
            message = "Location request timed out."
            break
        }

        toast({
          title: "Location access failed",
          description: message,
          variant: "destructive",
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  const calculateDistances = (userLoc: { lat: number; lng: number }) => {
    const updatedBranches = branches.map((branch) => ({
      ...branch,
      distance: calculateDistance(userLoc, branch.coordinates),
    }))
    setBranches(updatedBranches)
  }

  const calculateDistance = (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((pos2.lat - pos1.lat) * Math.PI) / 180
    const dLng = ((pos2.lng - pos1.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pos1.lat * Math.PI) / 180) *
        Math.cos((pos2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const openDirections = (branch: Branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`
    window.open(url, "_blank")
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "atm":
        return <CreditCard className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "wheelchair access":
        return <Accessibility className="w-4 h-4" />
      case "coffee shop":
        return <Coffee className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      default:
        return <Building className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-200 mb-4">
              🏢 Branch Locator
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Branches
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Locate the nearest Gebeta SACCOS branch and get directions, contact information, and available services.
            </p>
          </motion.div>

          {/* Location Request */}
          {locationPermission === "pending" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Branches Near You</h3>
                  <p className="text-gray-600 mb-4">
                    Allow location access to see branches sorted by distance and get personalized directions.
                  </p>
                  <Button
                    onClick={requestLocation}
                    disabled={isLoadingLocation}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoadingLocation ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Getting Location...
                      </>
                    ) : (
                      <>
                        <Navigation className="w-4 h-4 mr-2" />
                        Enable Location
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-4 mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-blue-200"
              />
            </div>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-blue-200">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city === "all" ? "All Cities" : city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-blue-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCity("all")
                setSortBy("distance")
              }}
              className="bg-white/80 backdrop-blur-sm border-blue-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </motion.div>

          {/* Branches Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredBranches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 mb-2">{branch.name}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(branch.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {branch.rating} ({branch.reviews} reviews)
                            </span>
                          </div>
                        </div>
                        {branch.distance && (
                          <Badge className="bg-green-100 text-green-800">{branch.distance.toFixed(1)} km</Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Address */}
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-gray-900 font-medium">{branch.address}</p>
                          <p className="text-gray-600 text-sm">{branch.city}</p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-gray-900">{branch.phone}</p>
                          <p className="text-gray-600 text-sm">{branch.email}</p>
                        </div>
                      </div>

                      {/* Manager */}
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-gray-900">Manager: {branch.manager}</p>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="text-gray-900">Mon-Fri: {branch.hours.weekdays}</p>
                          <p className="text-gray-900">Sat: {branch.hours.saturday}</p>
                          <p className="text-gray-900">Sun: {branch.hours.sunday}</p>
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Services</h4>
                        <div className="flex flex-wrap gap-1">
                          {branch.services.map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {branch.amenities.map((amenity, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1"
                            >
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-4">
                        <Button onClick={() => openDirections(branch)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Navigation className="w-4 h-4 mr-2" />
                          Directions
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => window.open(`tel:${branch.phone}`, "_self")}
                          className="flex-1"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredBranches.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No branches found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
