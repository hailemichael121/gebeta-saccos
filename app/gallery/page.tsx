"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Grid3X3,
  List,
  Heart,
  Share2,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Camera,
  Award,
} from "lucide-react"
import Image from "next/image"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())

  const categories = [
    { id: "all", label: "All Photos", count: 24 },
    { id: "office", label: "Office & Facilities", count: 6 },
    { id: "team", label: "Our Team", count: 4 },
    { id: "community", label: "Community Events", count: 8 },
    { id: "events", label: "Corporate Events", count: 6 },
  ]

  const galleryImages = [
    {
      id: 1,
      src: "/gallery/office-1.jpg",
      title: "Main Branch Office",
      category: "office",
      description: "Our modern main branch located in Bole, Addis Ababa",
      date: "2024-01-15",
      location: "Bole, Addis Ababa",
      likes: 45,
    },
    {
      id: 2,
      src: "/gallery/office-2.jpg",
      title: "Customer Service Area",
      category: "office",
      description: "Comfortable and modern customer service area",
      date: "2024-01-15",
      location: "Main Branch",
      likes: 32,
    },
    {
      id: 3,
      src: "/gallery/team-1.jpg",
      title: "Leadership Team",
      category: "team",
      description: "Our dedicated leadership team committed to serving our members",
      date: "2024-02-01",
      location: "Head Office",
      likes: 78,
    },
    {
      id: 4,
      src: "/gallery/team-2.jpg",
      title: "Customer Service Team",
      category: "team",
      description: "Our friendly customer service representatives",
      date: "2024-02-01",
      location: "Main Branch",
      likes: 56,
    },
    {
      id: 5,
      src: "/gallery/community-1.jpg",
      title: "Financial Literacy Workshop",
      category: "community",
      description: "Community financial literacy and education program",
      date: "2024-03-10",
      location: "Community Center",
      likes: 89,
    },
    {
      id: 6,
      src: "/gallery/community-2.jpg",
      title: "Member Appreciation Day",
      category: "community",
      description: "Celebrating our valued members and their achievements",
      date: "2024-03-15",
      location: "Main Branch",
      likes: 102,
    },
    {
      id: 7,
      src: "/gallery/event-1.jpg",
      title: "Annual General Meeting",
      category: "events",
      description: "Our annual general meeting with all stakeholders",
      date: "2024-04-20",
      location: "Conference Hall",
      likes: 67,
    },
    {
      id: 8,
      src: "/gallery/event-2.jpg",
      title: "New Branch Opening",
      category: "events",
      description: "Grand opening of our new branch in Merkato",
      date: "2024-05-05",
      location: "Merkato Branch",
      likes: 134,
    },
  ]

  const filteredImages = galleryImages.filter((image) => {
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
    const matchesSearch =
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(imageId)) {
        newSet.delete(imageId)
      } else {
        newSet.add(imageId)
      }
      return newSet
    })
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
      const nextIndex = (currentIndex + 1) % filteredImages.length
      setSelectedImage(filteredImages[nextIndex].id)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
      setSelectedImage(filteredImages[prevIndex].id)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "Escape") setSelectedImage(null)
        if (e.key === "ArrowRight") nextImage()
        if (e.key === "ArrowLeft") prevImage()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-green-100/30 to-purple-100/30 animate-gradient-flow" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-200 mb-4">
              📸 Photo Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore moments that define our journey, showcase our community, and celebrate our achievements together.
            </p>
          </motion.div>

          {/* Featured Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Camera className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Professional Photography</h3>
                <p className="text-blue-100">High-quality images capturing our best moments</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Focus</h3>
                <p className="text-green-100">Showcasing our vibrant member community</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Milestone Moments</h3>
                <p className="text-purple-100">Celebrating achievements and growth</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-blue-200"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"
            }
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <div className="relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(image.id)
                        }}
                      >
                        <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{image.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(image.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{image.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Heart className="w-4 h-4" />
                        <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)} likes</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categories.find((cat) => cat.id === image.category)?.label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const image = galleryImages.find((img) => img.id === selectedImage)
                if (!image) return null

                return (
                  <>
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      width={800}
                      height={600}
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-6 rounded-b-lg">
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                      <p className="text-gray-300 mb-3">{image.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(image.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{image.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="secondary" onClick={() => toggleLike(image.id)}>
                            <Heart
                              className={`w-4 h-4 mr-1 ${likedImages.has(image.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                            {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}

              {/* Navigation Buttons */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Close Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
