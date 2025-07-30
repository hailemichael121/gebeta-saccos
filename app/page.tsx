"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDown,
  TrendingUp,
  Users,
  Shield,
  Heart,
  Eye,
  Target,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Banknote,
  PiggyBank,
  Building,
  Smartphone,
  Home,
  Car,
  GraduationCap,
  Play,
  Pause,
  MousePointer,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [language, setLanguage] = useState("en")
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])

  const services = [
    {
      icon: PiggyBank,
      title: "Savings Account",
      description: "Secure your future with our competitive savings plans and earn up to 8.5% annual interest",
      color: "from-blue-500 to-indigo-600",
      features: ["8.5% Annual Interest", "No Monthly Fees", "Mobile Banking", "ATM Access"],
    },
    {
      icon: TrendingUp,
      title: "Personal Loans",
      description: "Quick and affordable loans for your personal needs with flexible repayment terms",
      color: "from-green-500 to-emerald-600",
      features: ["Up to 500,000 Birr", "12% Interest Rate", "Quick Approval", "Flexible Terms"],
    },
    {
      icon: Building,
      title: "Business Loans",
      description: "Fuel your business growth with our tailored business financing solutions",
      color: "from-purple-500 to-violet-600",
      features: ["Up to 2M Birr", "14% Interest Rate", "Business Support", "Expert Advisory"],
    },
    {
      icon: Home,
      title: "Home Loans",
      description: "Make your dream of homeownership a reality with our competitive mortgage rates",
      color: "from-orange-500 to-red-600",
      features: ["Up to 80% Financing", "10% Interest Rate", "Long-term Repayment", "Property Insurance"],
    },
    {
      icon: Car,
      title: "Vehicle Loans",
      description: "Drive your dream car with our affordable vehicle financing options",
      color: "from-teal-500 to-cyan-600",
      features: ["New & Used Cars", "13% Interest Rate", "Quick Processing", "Insurance Included"],
    },
    {
      icon: GraduationCap,
      title: "Education Loans",
      description: "Invest in your future with our education financing programs",
      color: "from-yellow-500 to-amber-600",
      features: ["Student-friendly", "9% Interest Rate", "Grace Period", "Covers All Expenses"],
    },
    {
      icon: Users,
      title: "Share Investment",
      description: "Become a shareholder and earn dividends from our cooperative growth",
      color: "from-blue-600 to-green-600",
      features: ["15% Dividend Yield", "Voting Rights", "Capital Growth", "Member Benefits"],
    },
    {
      icon: Shield,
      title: "Time Deposits",
      description: "Higher returns with our fixed-term deposit accounts and guaranteed rates",
      color: "from-green-600 to-blue-600",
      features: ["Up to 12% Returns", "Fixed Terms", "Guaranteed Rates", "Auto Renewal"],
    },
    {
      icon: Smartphone,
      title: "Mobile Banking",
      description: "Bank anytime, anywhere with our comprehensive mobile banking application",
      color: "from-pink-500 to-rose-600",
      features: ["24/7 Access", "Money Transfers", "Bill Payments", "Account Management"],
    },
  ]

  const testimonials = [
    {
      name: "Almaz Tadesse",
      role: "Small Business Owner",
      content:
        "Gebeta SACCOS helped me expand my coffee shop with their quick loan approval process. Truly life-changing!",
      rating: 5,
      image: "/testimonial-1.jpg",
    },
    {
      name: "Dawit Mekonnen",
      role: "Farmer",
      content: "The savings program helped me save for my children's education. I'm grateful for their support.",
      rating: 5,
      image: "/testimonial-2.jpg",
    },
    {
      name: "Hanan Ahmed",
      role: "Teacher",
      content: "Professional service and competitive rates. I recommend Gebeta SACCOS to all my colleagues.",
      rating: 5,
      image: "/testimonial-3.jpg",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Active Members" },
    { number: "50M+", label: "Birr in Loans" },
    { number: "15+", label: "Years of Service" },
    { number: "98%", label: "Customer Satisfaction" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Smooth auto-scroll for services
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || !isAutoScrolling) return

    let scrollPosition = 0
    const cardWidth = 320 // Width of each card + gap
    const totalWidth = services.length * cardWidth
    const speed = 0.5 // Slower, smoother scroll

    const scroll = () => {
      if (!isAutoScrolling) return

      scrollPosition += speed
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 16) // 60fps for smooth animation
    return () => clearInterval(intervalId)
  }, [isAutoScrolling, services.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-green-100/40 to-purple-100/40 animate-gradient-flow" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl animate-float" />
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-300/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "6s" }}
          />
        </div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section
          id="home"
          className="pt-20 pb-16 px-4 min-h-screen flex items-center bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-green-800/90"
        >
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 text-white"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      🌟 Trusted by 10,000+ Members
                    </Badge>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-bold leading-tight"
                  >
                    Empowering Your{" "}
                    <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                      Financial Dreams
                    </span>{" "}
                    with Every Birr
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-blue-100 leading-relaxed"
                  >
                    Join Ethiopia's most trusted SACCOS and unlock financial opportunities that grow with you. Save,
                    invest, and borrow with confidence through our cooperative financial services.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/auth/register">
                      <Users className="w-5 h-5 mr-2" />
                      Become a Member
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg rounded-xl"
                    asChild
                  >
                    <Link href="/apply">
                      <Banknote className="w-5 h-5 mr-2" />
                      Apply for Loan
                    </Link>
                  </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
                >
                  {stats.map((stat, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10">
                  <Image
                    src="/hero-finance.jpg"
                    alt="Gebeta SACCOS - Financial Services and Cooperative Banking"
                    width={600}
                    height={700}
                    className="rounded-2xl shadow-2xl object-cover w-full h-[500px] lg:h-[600px]"
                    priority
                  />

                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Cooperative Financial Services</h3>
                    <p className="text-white/90 mb-4">
                      Building stronger communities through shared financial growth and prosperity
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="text-sm">Secure</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <span className="text-sm">Growing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm">Community</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-500 to-green-500 p-4 rounded-2xl shadow-lg"
                >
                  <TrendingUp className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg"
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [0, 3, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                  className="absolute top-1/2 -left-6 bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl shadow-lg"
                >
                  <PiggyBank className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
              onClick={scrollToServices}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm text-blue-200">Scroll to explore</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                >
                  <ArrowDown className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Animated Services Section */}
        <section id="services" className="py-20 px-4 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Financial Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Comprehensive financial solutions designed to help you achieve your goals
              </p>

              {/* Auto-scroll controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className="flex items-center space-x-2"
                >
                  {isAutoScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isAutoScrolling ? "Pause" : "Play"} Auto-scroll</span>
                </Button>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MousePointer className="w-4 h-4" />
                  <span>Hover to pause</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Scrolling Services Cards */}
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-hidden pb-4 scroll-smooth"
                onMouseEnter={() => setIsAutoScrolling(false)}
                onMouseLeave={() => setIsAutoScrolling(true)}
              >
                {/* Triple services for seamless loop */}
                {[...services, ...services, ...services].map((service, index) => (
                  <motion.div
                    key={`${service.title}-${index}`}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="flex-shrink-0 w-80"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 overflow-hidden group">
                      <div
                        className={`h-2 bg-gradient-to-r ${service.color} group-hover:h-3 transition-all duration-300`}
                      />

                      <CardHeader className="text-center pb-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        >
                          <service.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                          {service.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <CardDescription className="text-gray-600 text-center leading-relaxed">
                          {service.description}
                        </CardDescription>

                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-2`} />
                              {feature}
                            </motion.div>
                          ))}
                        </div>

                        <Button
                          className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300`}
                          asChild
                        >
                          <Link href="/services">Learn More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50/90 to-green-50/90 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Target className="w-8 h-8 text-blue-600" />
                    <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To provide accessible, reliable, and innovative financial services that empower our members to
                    achieve financial independence and contribute to the economic development of Ethiopia.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-8 h-8 text-green-600" />
                    <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To be the leading SACCOS in Ethiopia, recognized for our commitment to member satisfaction,
                    financial inclusion, and sustainable community development.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="/mission-vision.jpg"
                  alt="Our Mission and Vision"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-xl object-cover"
                />
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Members Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our satisfied members have to say about their experience
                with Gebeta SACCOS.
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
                    <CardContent className="p-12 text-center">
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <blockquote className="text-2xl text-gray-700 mb-8 leading-relaxed italic">
                        "{testimonials[currentTestimonial].content}"
                      </blockquote>

                      <div className="flex items-center justify-center space-x-4">
                        <Image
                          src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                          alt={testimonials[currentTestimonial].name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                        <div className="text-left">
                          <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                          <div className="text-blue-600">{testimonials[currentTestimonial].role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full border-blue-200 hover:bg-blue-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full border-blue-200 hover:bg-blue-50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-blue-600 w-8" : "bg-blue-200 hover:bg-blue-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Financial Journey?</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Join thousands of satisfied members who have transformed their financial lives with Gebeta SACCOS. Your
                prosperity is our priority.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/register">
                    <Users className="w-6 h-6 mr-3" />
                    Join Gebeta SACCOS Today
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/logo.png"
                      alt="Gebeta SACCOS Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Gebeta SACCOS</h3>
                    <p className="text-sm text-gray-400">LTD</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Empowering Ethiopian communities through accessible financial services and cooperative principles.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-blue-600">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-blue-600">
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-blue-600">
                    <Instagram className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold">Quick Links</h4>
                <div className="space-y-3">
                  <Link href="/about" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                  <Link href="/services" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    Our Services
                  </Link>
                  <Link href="/apply" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    Apply for Loan
                  </Link>
                  <Link href="/branches" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    Find Branches
                  </Link>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold">Services</h4>
                <div className="space-y-3">
                  <Link href="/services#savings" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    Savings Account
                  </Link>
                  <Link href="/services#loans" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    Loan Products
                  </Link>
                  <Link href="/services#shares" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    Share Investment
                  </Link>
                  <Link href="/services#deposits" className="block text-gray-300 hover:text-blue-400 transition-colors">
                    Time Deposits
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold">Contact Us</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">+251 11 123 4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">info@gebetasaccos.com</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                    <span className="text-gray-300">
                      Addis Ababa, Ethiopia
                      <br />
                      Bole Sub City
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="border-t border-gray-800 pt-8 mb-8">
              <div className="max-w-md mx-auto text-center">
                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                <p className="text-gray-300 mb-4">
                  Subscribe to our newsletter for the latest updates and financial tips.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400">© {new Date().getFullYear()} Gebeta SACCOS LTD. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
