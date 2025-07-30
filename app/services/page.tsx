"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Banknote,
  TrendingUp,
  Users,
  Shield,
  Smartphone,
  Home,
  Car,
  GraduationCap,
  Building,
  Leaf,
  Heart,
  Calculator,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Target,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const services = [
    {
      id: 1,
      category: "personal",
      icon: Banknote,
      title: "Regular Savings Account",
      shortDesc: "Build your financial future with our flexible savings options",
      fullDesc:
        "Our Regular Savings Account offers competitive interest rates with the flexibility to deposit and withdraw funds as needed. Perfect for building an emergency fund or saving for future goals.",
      features: [
        "Minimum balance: 100 Birr",
        "Monthly interest payments",
        "Free ATM access",
        "Mobile banking included",
      ],
      interestRate: "8.5% per annum",
      color: "from-green-500 to-emerald-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: true,
    },
    {
      id: 2,
      category: "personal",
      icon: TrendingUp,
      title: "Personal Loan",
      shortDesc: "Quick and affordable loans for your personal needs",
      fullDesc:
        "Get the financial support you need for personal expenses, emergencies, or opportunities. Our personal loans offer competitive rates with flexible repayment terms.",
      features: [
        "Up to 500,000 Birr",
        "Flexible repayment terms",
        "Quick approval process",
        "Competitive interest rates",
      ],
      interestRate: "12% per annum",
      color: "from-blue-500 to-indigo-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
    },
    {
      id: 3,
      category: "business",
      icon: Building,
      title: "Business Loan",
      shortDesc: "Fuel your business growth with our tailored business loans",
      fullDesc:
        "Whether you're starting a new business or expanding an existing one, our business loans provide the capital you need to achieve your entrepreneurial goals.",
      features: [
        "Up to 2,000,000 Birr",
        "Business-friendly terms",
        "Expert advisory support",
        "Flexible collateral options",
      ],
      interestRate: "14% per annum",
      color: "from-purple-500 to-violet-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: true,
    },
    {
      id: 4,
      category: "personal",
      icon: Home,
      title: "Home Loan",
      shortDesc: "Make your dream of homeownership a reality",
      fullDesc:
        "Our home loans offer competitive rates and flexible terms to help you purchase your dream home. We support both new construction and existing property purchases.",
      features: ["Up to 80% financing", "Long-term repayment", "Property insurance included", "Expert guidance"],
      interestRate: "10% per annum",
      color: "from-orange-500 to-red-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
    },
    {
      id: 5,
      category: "personal",
      icon: Car,
      title: "Vehicle Loan",
      shortDesc: "Drive your dream car with our affordable vehicle financing",
      fullDesc:
        "Get behind the wheel of your dream vehicle with our competitive vehicle loans. We finance both new and used cars with flexible payment options.",
      features: ["Up to 1,000,000 Birr", "New and used vehicles", "Comprehensive insurance", "Quick processing"],
      interestRate: "13% per annum",
      color: "from-teal-500 to-cyan-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
    },
    {
      id: 6,
      category: "personal",
      icon: GraduationCap,
      title: "Education Loan",
      shortDesc: "Invest in your future with our education financing",
      fullDesc:
        "Support your educational journey or your children's with our education loans. We believe in the power of education to transform lives.",
      features: [
        "Flexible repayment",
        "Grace period available",
        "Covers tuition and expenses",
        "Student-friendly terms",
      ],
      interestRate: "9% per annum",
      color: "from-yellow-500 to-amber-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
    },
    {
      id: 7,
      category: "investment",
      icon: Users,
      title: "Share Investment",
      shortDesc: "Become a shareholder and earn dividends from our growth",
      fullDesc:
        "Invest in Gebeta SACCOS by purchasing shares and become a part-owner of our cooperative. Earn dividends based on our annual performance.",
      features: ["Minimum 10 shares", "Annual dividend payments", "Voting rights", "Capital appreciation"],
      interestRate: "15% dividend yield",
      color: "from-emerald-500 to-green-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: true,
    },
    {
      id: 8,
      category: "investment",
      icon: Shield,
      title: "Time Deposit",
      shortDesc: "Higher returns with our fixed-term deposit accounts",
      fullDesc:
        "Lock in higher interest rates with our time deposit accounts. Choose from various terms to match your financial planning needs.",
      features: [
        "3, 6, 12, 24 month terms",
        "Higher interest rates",
        "Automatic renewal option",
        "Certificate provided",
      ],
      interestRate: "Up to 12% per annum",
      color: "from-indigo-500 to-purple-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
    },
    {
      id: 9,
      category: "digital",
      icon: Smartphone,
      title: "Mobile Banking",
      shortDesc: "Bank anytime, anywhere with our comprehensive mobile app",
      fullDesc:
        "Access all your banking services through our secure mobile application. Transfer money, pay bills, check balances, and more from the convenience of your smartphone.",
      features: ["24/7 account access", "Money transfers", "Bill payments", "Transaction history"],
      interestRate: "Free service",
      color: "from-pink-500 to-rose-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: true,
    },
    {
      id: 10,
      category: "community",
      icon: Leaf,
      title: "Green Loan",
      shortDesc: "Support sustainable projects with our eco-friendly loans",
      fullDesc:
        "Finance environmentally friendly projects and sustainable business practices with our special green loans. Help build a better future while growing your business.",
      features: [
        "Renewable energy projects",
        "Sustainable agriculture",
        "Eco-friendly businesses",
        "Special interest rates",
      ],
      interestRate: "11% per annum",
      color: "from-green-600 to-teal-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
    },
    {
      id: 11,
      category: "community",
      icon: Heart,
      title: "Community Development Fund",
      shortDesc: "Contribute to community projects and social development",
      fullDesc:
        "Join our community development initiatives by contributing to projects that benefit local communities. Your investment creates positive social impact.",
      features: ["Community projects", "Social impact", "Transparent reporting", "Regular updates"],
      interestRate: "Social returns",
      color: "from-red-500 to-pink-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
    },
    {
      id: 12,
      category: "business",
      icon: Zap,
      title: "Quick Cash Loan",
      shortDesc: "Fast emergency funding when you need it most",
      fullDesc:
        "Get quick access to emergency funds with our fast-track loan approval process. Perfect for urgent business needs or unexpected opportunities.",
      features: ["Same-day approval", "Minimal documentation", "Up to 100,000 Birr", "Emergency support"],
      interestRate: "16% per annum",
      color: "from-yellow-600 to-orange-600",
      image: "/placeholder.svg?height=300&width=400",
      popular: true,
    },
  ]

  const categories = [
    { id: "all", label: "All Services", icon: Target },
    { id: "personal", label: "Personal", icon: Users },
    { id: "business", label: "Business", icon: Building },
    { id: "investment", label: "Investment", icon: TrendingUp },
    { id: "digital", label: "Digital", icon: Smartphone },
    { id: "community", label: "Community", icon: Heart },
  ]

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

  const popularServices = services.filter((service) => service.popular)

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
              💼 Our Services
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Financial Solutions{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Tailored
              </span>{" "}
              for You
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive range of financial services designed to meet your personal, business, and
              investment needs with competitive rates and exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Popular Services Highlight */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Most Popular Services</h2>
            <p className="text-lg text-gray-600">Our members' favorite financial solutions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>

                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">{service.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 mb-4">{service.shortDesc}</p>
                    <div className="text-lg font-bold text-green-600 mb-4">{service.interestRate}</div>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore All Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete range of financial services organized by category
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-green-50 border border-green-200"
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Services Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="book-card cursor-pointer"
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                >
                  <div className="relative w-full h-96">
                    {/* Front of card */}
                    <div className="book-front absolute inset-0">
                      <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                        <div className="relative">
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            width={400}
                            height={200}
                            className="w-full h-32 object-cover"
                          />
                          {service.popular && (
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>

                        <CardContent className="p-6">
                          <div
                            className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                          >
                            <service.icon className="w-6 h-6 text-white" />
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.shortDesc}</p>

                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-green-600">{service.interestRate}</div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Back of card */}
                    <div className="book-back absolute inset-0">
                      <Card
                        className={`h-full border-0 shadow-xl bg-gradient-to-br ${service.color} text-white overflow-hidden`}
                      >
                        <CardContent className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <service.icon className="w-8 h-8" />
                            <Badge className="bg-white/20 text-white border-white/30">{service.interestRate}</Badge>
                          </div>

                          <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                          <p className="text-white/90 text-sm mb-4 flex-grow">{service.fullDesc}</p>

                          <div className="space-y-2 mb-4">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-white/80" />
                                <span className="text-white/90">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                            asChild
                          >
                            <Link href={`/apply?service=${service.id}`}>Apply Now</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Loan Calculator</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your monthly payments and plan your finances
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <Calculator className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Calculation</h3>
                      <p className="text-gray-600">Get instant loan estimates</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount (Birr)</label>
                        <input
                          type="number"
                          placeholder="100,000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                        <input
                          type="number"
                          placeholder="12"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Term (Months)</label>
                        <input
                          type="number"
                          placeholder="24"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700 py-3">Calculate Payment</Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-6">Payment Summary</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-white/20">
                        <span>Monthly Payment</span>
                        <span className="text-2xl font-bold">4,850 Birr</span>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-white/20">
                        <span>Total Interest</span>
                        <span className="text-xl font-semibold">16,400 Birr</span>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-white/20">
                        <span>Total Amount</span>
                        <span className="text-xl font-semibold">116,400 Birr</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button
                        variant="secondary"
                        className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                        asChild
                      >
                        <Link href="/apply">Apply for This Loan</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Gebeta SACCOS?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference of member-focused financial services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "15+ Years Experience",
                description: "Trusted financial partner with proven track record",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: Users,
                title: "10,000+ Happy Members",
                description: "Growing community of satisfied customers",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: Clock,
                title: "Quick Processing",
                description: "Fast approval and disbursement of loans",
                color: "from-purple-500 to-violet-600",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Your money is safe with our robust security",
                color: "from-orange-500 to-red-600",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 text-center">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Choose the service that fits your needs and take the first step towards your financial goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 px-12 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/apply">
                    <Banknote className="w-6 h-6 mr-3" />
                    Apply Now
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-12 py-6 text-xl rounded-xl"
                  asChild
                >
                  <Link href="/contact">
                    <Users className="w-6 h-6 mr-3" />
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
