"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Calendar,
  User,
  Eye,
  Heart,
  Share2,
  Filter,
  Clock,
  TrendingUp,
  Briefcase,
  Users,
  Bell,
  Award,
  BookOpen,
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const categories = [
    { id: "all", label: "All News", icon: BookOpen },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "events", label: "Events", icon: Calendar },
    { id: "jobs", label: "Job Opportunities", icon: Briefcase },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "community", label: "Community", icon: Users },
    { id: "financial", label: "Financial Tips", icon: TrendingUp },
  ]

  const newsData = [
    {
      id: 1,
      category: "announcements",
      title: "New Mobile Banking App Launch",
      excerpt:
        "We're excited to announce the launch of our new mobile banking application with enhanced security features and user-friendly interface.",
      content:
        "Our new mobile banking app brings you closer to your financial goals with features like instant transfers, bill payments, loan applications, and real-time notifications. Download now from App Store and Google Play.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Gebeta SACCOS Team",
      publishDate: "2024-01-15",
      readTime: "3 min read",
      views: 1250,
      likes: 89,
      featured: true,
      tags: ["Technology", "Mobile Banking", "Innovation"],
    },
    {
      id: 2,
      category: "events",
      title: "Annual General Meeting 2024",
      excerpt:
        "Join us for our Annual General Meeting where we'll discuss our achievements, future plans, and member benefits.",
      content:
        "Our AGM will be held on February 20th, 2024, at the Gebeta SACCOS headquarters. All members are invited to participate in this important event where we'll review our annual performance and discuss upcoming initiatives.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Dr. Almaz Tadesse",
      publishDate: "2024-01-10",
      readTime: "2 min read",
      views: 890,
      likes: 67,
      featured: false,
      tags: ["AGM", "Members", "Annual Report"],
    },
    {
      id: 3,
      category: "jobs",
      title: "We're Hiring: Loan Officer Position",
      excerpt:
        "Exciting opportunity to join our growing team as a Loan Officer. We're looking for dedicated professionals to help our members achieve their financial goals.",
      content:
        "We are seeking a qualified Loan Officer to join our team. The ideal candidate will have experience in credit analysis, customer service, and financial advisory. Competitive salary and benefits package available.",
      image: "/placeholder.svg?height=400&width=600",
      author: "HR Department",
      publishDate: "2024-01-08",
      readTime: "4 min read",
      views: 654,
      likes: 45,
      featured: false,
      tags: ["Jobs", "Loan Officer", "Career"],
    },
    {
      id: 4,
      category: "achievements",
      title: "Gebeta SACCOS Wins Best Cooperative Award",
      excerpt:
        "We're proud to announce that Gebeta SACCOS has been recognized as the Best Cooperative of the Year by the Ethiopian Cooperative Commission.",
      content:
        "This prestigious award recognizes our commitment to member service, financial inclusion, and community development. We thank our members for their continued trust and support.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Communications Team",
      publishDate: "2024-01-05",
      readTime: "3 min read",
      views: 1456,
      likes: 123,
      featured: true,
      tags: ["Award", "Recognition", "Achievement"],
    },
    {
      id: 5,
      category: "financial",
      title: "5 Smart Saving Tips for 2024",
      excerpt:
        "Start the new year right with these practical saving tips that can help you build a stronger financial future.",
      content:
        "Learn how to create a budget, automate your savings, reduce unnecessary expenses, and make your money work for you. These simple strategies can make a big difference in your financial health.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Financial Advisory Team",
      publishDate: "2024-01-03",
      readTime: "5 min read",
      views: 2100,
      likes: 156,
      featured: false,
      tags: ["Savings", "Financial Tips", "Budgeting"],
    },
    {
      id: 6,
      category: "community",
      title: "Community Development Project Success",
      excerpt:
        "Our latest community development project has successfully provided clean water access to 500 families in rural areas.",
      content:
        "Through our Community Development Fund, we've completed the installation of water pumps and distribution systems in three rural communities. This project demonstrates our commitment to social impact beyond financial services.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Community Relations",
      publishDate: "2024-01-01",
      readTime: "4 min read",
      views: 987,
      likes: 78,
      featured: false,
      tags: ["Community", "Development", "Social Impact"],
    },
    {
      id: 7,
      category: "announcements",
      title: "New Branch Opening in Bahir Dar",
      excerpt:
        "We're expanding our services with a new branch in Bahir Dar to better serve our members in the Amhara region.",
      content:
        "Our new Bahir Dar branch will offer all our standard services including savings accounts, loans, and investment products. The branch will be officially opened on March 1st, 2024.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Operations Team",
      publishDate: "2023-12-28",
      readTime: "2 min read",
      views: 743,
      likes: 52,
      featured: false,
      tags: ["Branch", "Expansion", "Bahir Dar"],
    },
    {
      id: 8,
      category: "events",
      title: "Financial Literacy Workshop Series",
      excerpt:
        "Join our free financial literacy workshops designed to help you make informed financial decisions and build wealth.",
      content:
        "Our workshop series covers topics like budgeting, investing, loan management, and retirement planning. Sessions are held every Saturday morning at our main branch. Registration is free for all members.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Education Department",
      publishDate: "2023-12-25",
      readTime: "3 min read",
      views: 1123,
      likes: 94,
      featured: true,
      tags: ["Education", "Workshop", "Financial Literacy"],
    },
  ]

  const filteredNews = newsData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = newsData.filter((post) => post.featured)
  const recentNews = newsData.slice(0, 4)

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 text-lg px-6 py-2">
              📰 News & Updates
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Stay{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Informed
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get the latest news, announcements, and updates from Gebeta SACCOS. Stay connected with your financial
              community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
            <p className="text-lg text-gray-600">Don't miss these important updates</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredNews.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden glass">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className={`w-full object-cover transition-transform duration-300 hover:scale-110 ${
                        index === 0 ? "h-64 lg:h-80" : "h-48"
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">Featured</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/50 text-white">
                        {categories.find((cat) => cat.id === post.category)?.label}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className={`font-bold text-gray-900 mb-3 ${index === 0 ? "text-2xl lg:text-3xl" : "text-xl"}`}>
                      {post.title}
                    </h3>

                    <p className={`text-gray-600 mb-4 ${index === 0 ? "text-lg" : "text-base"}`}>{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </button>
                      </div>

                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/news/${post.id}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search news and announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg border-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  <Filter className="w-4 h-4 mr-2" />
                  {categories.find((cat) => cat.id === selectedCategory)?.label}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="cursor-pointer"
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-green-50 border border-green-200"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>

          {/* News Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredNews.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden glass">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${
                            categories.find((cat) => cat.id === post.category)?.id === "jobs"
                              ? "bg-blue-600"
                              : categories.find((cat) => cat.id === post.category)?.id === "events"
                                ? "bg-purple-600"
                                : "bg-green-600"
                          } text-white`}
                        >
                          {categories.find((cat) => cat.id === post.category)?.label}
                        </Badge>
                      </div>

                      {/* Tags */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} className="bg-white/20 text-white border-white/30 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                              }`}
                            />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Share2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full mt-4 group-hover:bg-green-50 group-hover:text-green-600"
                        asChild
                      >
                        <Link href={`/news/${post.id}`}>
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredNews.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Never Miss an Update</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Subscribe to our newsletter and get the latest news, announcements, and financial tips delivered directly
              to your inbox.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/20 border-white/30 text-white placeholder-white/70 backdrop-blur-md"
                />
                <Button className="bg-white text-green-600 hover:bg-green-50 px-8">Subscribe</Button>
              </div>
              <p className="text-green-100 text-sm mt-3">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
