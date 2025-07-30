"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Heart,
  Shield,
  Target,
  Award,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Calendar,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  })

  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description: "We conduct our business with honesty, transparency, and ethical practices in all our dealings.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of collective growth and supporting each other's financial journey.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "We build lasting relationships based on reliability, security, and consistent service delivery.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in service quality and member satisfaction.",
      color: "from-purple-500 to-violet-600",
    },
  ]

  const timeline = [
    {
      year: "2008",
      title: "Foundation",
      description: "Gebeta SACCOS was established with 50 founding members and a vision to serve the community.",
      icon: "🌱",
    },
    {
      year: "2012",
      title: "First Milestone",
      description: "Reached 1,000 members and launched our first loan products for small businesses.",
      icon: "🎯",
    },
    {
      year: "2016",
      title: "Digital Transformation",
      description: "Introduced mobile banking services and online account management for members.",
      icon: "💻",
    },
    {
      year: "2019",
      title: "Community Impact",
      description: "Supported over 500 small businesses and helped 200 families buy their first homes.",
      icon: "🏠",
    },
    {
      year: "2022",
      title: "Innovation Hub",
      description: "Launched financial literacy programs and youth entrepreneurship initiatives.",
      icon: "🚀",
    },
    {
      year: "2024",
      title: "Future Ready",
      description: "Expanding services with AI-powered financial advisory and sustainable investment options.",
      icon: "🌟",
    },
  ]

  const team = [
    {
      name: "Dr. Almaz Tadesse",
      role: "Chief Executive Officer",
      bio: "With over 15 years in cooperative finance, Dr. Almaz leads our strategic vision and member-focused initiatives.",
      image: "/placeholder.svg?height=300&width=300",
      email: "almaz@gebetasaccos.com",
      linkedin: "#",
      specialties: ["Strategic Leadership", "Cooperative Finance", "Community Development"],
    },
    {
      name: "Dawit Mekonnen",
      role: "Chief Financial Officer",
      bio: "Expert in financial management and risk assessment, ensuring the stability and growth of our cooperative.",
      image: "/placeholder.svg?height=300&width=300",
      email: "dawit@gebetasaccos.com",
      linkedin: "#",
      specialties: ["Financial Management", "Risk Assessment", "Investment Strategy"],
    },
    {
      name: "Hanan Ahmed",
      role: "Head of Member Services",
      bio: "Passionate about member experience and community engagement, leading our customer service excellence.",
      image: "/placeholder.svg?height=300&width=300",
      email: "hanan@gebetasaccos.com",
      linkedin: "#",
      specialties: ["Member Relations", "Service Excellence", "Community Outreach"],
    },
    {
      name: "Solomon Bekele",
      role: "Head of Technology",
      bio: "Driving digital innovation and ensuring our technology infrastructure meets modern banking standards.",
      image: "/placeholder.svg?height=300&width=300",
      email: "solomon@gebetasaccos.com",
      linkedin: "#",
      specialties: ["Digital Innovation", "Cybersecurity", "System Architecture"],
    },
    {
      name: "Meron Girma",
      role: "Head of Loans",
      bio: "Specialist in credit analysis and loan portfolio management, helping members achieve their financial goals.",
      image: "/placeholder.svg?height=300&width=300",
      email: "meron@gebetasaccos.com",
      linkedin: "#",
      specialties: ["Credit Analysis", "Loan Management", "Financial Planning"],
    },
    {
      name: "Yohannes Desta",
      role: "Head of Operations",
      bio: "Ensuring smooth daily operations and process optimization across all our service delivery channels.",
      image: "/placeholder.svg?height=300&width=300",
      email: "yohannes@gebetasaccos.com",
      linkedin: "#",
      specialties: ["Operations Management", "Process Optimization", "Quality Assurance"],
    },
  ]

  const achievements = [
    { number: "15+", label: "Years of Service", icon: Calendar },
    { number: "10,000+", label: "Active Members", icon: Users },
    { number: "50M+", label: "Birr in Loans", icon: TrendingUp },
    { number: "98%", label: "Member Satisfaction", icon: Award },
  ]

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [values.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Water Flow Background */}
      <div className="fixed inset-0 water-flow opacity-30 pointer-events-none" />

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
              🌟 Our Story
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Building Dreams{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Together
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              For over 15 years, Gebeta SACCOS has been the cornerstone of financial empowerment in Ethiopian
              communities, transforming lives through cooperative principles and innovative services.
            </p>
          </motion.div>

          {/* Floating Achievement Cards */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <achievement.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-600 mb-1">{achievement.number}</div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Experience Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how we've grown from a small cooperative to Ethiopia's most trusted SACCOS
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
          >
            <video
              ref={videoRef}
              className="w-full h-auto"
              poster="/placeholder.svg?height=600&width=800"
              muted={isMuted}
              loop
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleVideoToggle}
                  size="lg"
                  className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30"
                >
                  {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>

                <Button
                  onClick={handleMuteToggle}
                  size="lg"
                  className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </Button>
              </div>

              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30">Gebeta SACCOS Story</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a leading financial cooperative in Ethiopia
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-200 via-green-400 to-green-600 rounded-full" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{item.icon}</div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-green-600">{item.year}</CardTitle>
                          <CardDescription className="text-lg font-semibold text-gray-900">
                            {item.title}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-lg z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every service we provide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: 180 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="book-card h-80 cursor-pointer"
                onClick={() => setActiveValue(index)}
              >
                <div className="relative w-full h-full">
                  {/* Front of card */}
                  <div className="book-front absolute inset-0">
                    <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <value.icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Back of card */}
                  <div className="book-back absolute inset-0">
                    <Card className={`h-full border-0 shadow-xl bg-gradient-to-br ${value.color}`}>
                      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <value.icon className="w-16 h-16 text-white mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                        <p className="text-white/90 leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated professionals who make Gebeta SACCOS a trusted financial partner
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-green-50">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Overlay with bio */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 text-white">
                        <p className="text-sm leading-relaxed">{member.bio}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {member.specialties.map((specialty, idx) => (
                            <Badge key={idx} className="bg-white/20 text-white border-white/30 text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-green-600 font-semibold mb-4">{member.role}</p>

                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-900 to-emerald-800 text-white relative overflow-hidden">
        {/* Ethiopian Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Culture & Heritage</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Rooted in Ethiopian traditions of community support and collective prosperity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl mb-6"
              >
                🤝
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Gebeta Spirit</h3>
              <p className="text-green-100 leading-relaxed">
                Like the traditional Ethiopian game of Gebeta, we believe in strategic thinking, patience, and the
                wisdom that comes from community collaboration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl mb-6"
              >
                🌾
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Community Harvest</h3>
              <p className="text-green-100 leading-relaxed">
                Our cooperative model mirrors the Ethiopian tradition of community farming, where collective effort
                yields greater prosperity for all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl mb-6"
              >
                ☕
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Coffee Circle</h3>
              <p className="text-green-100 leading-relaxed">
                Like the Ethiopian coffee ceremony that brings people together, we foster relationships built on trust,
                respect, and shared prosperity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Be Part of Our Story?</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Join thousands of members who have made Gebeta SACCOS their trusted financial partner. Your success story
              starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 px-12 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-3" />
                  Become a Member
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-12 py-6 text-xl rounded-xl"
                >
                  <Phone className="w-6 h-6 mr-3" />
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
