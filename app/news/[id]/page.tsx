"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  User,
  Eye,
  Share2,
  ArrowLeft,
  Clock,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface NewsArticle {
  id: number
  category: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  publishDate: string
  readTime: string
  views: number
  tags: string[]
}

export default function NewsDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [views, setViews] = useState(0)
  const [copied, setCopied] = useState(false)

  const newsData: NewsArticle[] = [
    {
      id: 1,
      category: "announcements",
      title: "New Mobile Banking App Launch",
      excerpt:
        "We're excited to announce the launch of our new mobile banking application with enhanced security features and user-friendly interface.",
      content: `
        <p>We are thrilled to announce the official launch of our brand new mobile banking application, designed to revolutionize how our members interact with their finances. This cutting-edge app represents months of development and testing to ensure we deliver the best possible banking experience.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li><strong>Enhanced Security:</strong> Multi-factor authentication and biometric login options</li>
          <li><strong>Instant Transfers:</strong> Send money to other Gebeta SACCOS members instantly</li>
          <li><strong>Bill Payments:</strong> Pay utilities, phone bills, and other services directly from the app</li>
          <li><strong>Loan Applications:</strong> Apply for loans and track application status in real-time</li>
          <li><strong>Account Management:</strong> View balances, transaction history, and statements</li>
          <li><strong>Branch Locator:</strong> Find nearby branches and ATMs with GPS integration</li>
        </ul>
        
        <h3>Getting Started</h3>
        <p>Download the app from the App Store or Google Play Store and follow these simple steps:</p>
        <ol>
          <li>Install the Gebeta SACCOS Mobile Banking app</li>
          <li>Register using your account number and personal details</li>
          <li>Set up your secure PIN and biometric authentication</li>
          <li>Start enjoying seamless banking on the go</li>
        </ol>
        
        <h3>Security First</h3>
        <p>Your security is our top priority. The app features bank-level encryption, secure login methods, and real-time fraud monitoring to protect your financial information.</p>
        
        <p>We encourage all our members to download and experience the convenience of mobile banking. For support or questions, contact our customer service team at +251 11 123 4567.</p>
      `,
      image: "/gallery/office-1.jpg",
      author: "Gebeta SACCOS Team",
      publishDate: "2024-01-15",
      readTime: "3 min read",
      views: 1250,
      tags: ["Technology", "Mobile Banking", "Innovation"],
    },
    {
      id: 2,
      category: "events",
      title: "Annual General Meeting 2024",
      excerpt:
        "Join us for our Annual General Meeting where we'll discuss our achievements, future plans, and member benefits.",
      content: `
        <p>We cordially invite all members to attend our Annual General Meeting (AGM) scheduled for February 20th, 2024. This important gathering will showcase our achievements over the past year and outline our strategic vision for the future.</p>
        
        <h3>Meeting Agenda</h3>
        <ul>
          <li>Chairman's Welcome Address</li>
          <li>Annual Financial Report Presentation</li>
          <li>Audit Committee Report</li>
          <li>Election of Board Members</li>
          <li>Strategic Plan for 2024-2025</li>
          <li>Member Q&A Session</li>
          <li>Dividend Distribution Announcement</li>
        </ul>
        
        <h3>Key Highlights to be Discussed</h3>
        <p>This year's AGM will feature several exciting announcements including our expansion plans, new service offerings, and technology upgrades that will benefit all members.</p>
        
        <h3>Registration and Attendance</h3>
        <p>All members are encouraged to attend. Please bring your membership card and a valid ID. Light refreshments will be provided.</p>
        
        <p><strong>Date:</strong> February 20th, 2024<br>
        <strong>Time:</strong> 9:00 AM - 12:00 PM<br>
        <strong>Venue:</strong> Gebeta SACCOS Main Branch Conference Hall</p>
      `,
      image: "/gallery/event-1.jpg",
      author: "Dr. Almaz Tadesse",
      publishDate: "2024-01-10",
      readTime: "2 min read",
      views: 890,
      tags: ["AGM", "Members", "Annual Report"],
    },
    {
      id: 3,
      category: "jobs",
      title: "We're Hiring: Loan Officer Position",
      excerpt:
        "Exciting opportunity to join our growing team as a Loan Officer. We're looking for dedicated professionals to help our members achieve their financial goals.",
      content: `
        <p>Gebeta SACCOS is expanding our team and seeking a qualified Loan Officer to join our dynamic organization. This is an excellent opportunity for a finance professional to make a meaningful impact in the cooperative banking sector.</p>
        
        <h3>Job Responsibilities</h3>
        <ul>
          <li>Evaluate loan applications and assess creditworthiness</li>
          <li>Conduct financial analysis and risk assessment</li>
          <li>Provide financial advisory services to members</li>
          <li>Maintain accurate loan documentation and records</li>
          <li>Monitor loan portfolio performance</li>
          <li>Build relationships with members and promote loan products</li>
        </ul>
        
        <h3>Required Qualifications</h3>
        <ul>
          <li>Bachelor's degree in Finance, Economics, or related field</li>
          <li>Minimum 2 years experience in banking or financial services</li>
          <li>Strong analytical and communication skills</li>
          <li>Knowledge of Ethiopian banking regulations</li>
          <li>Proficiency in Amharic and English</li>
        </ul>
        
        <h3>What We Offer</h3>
        <p>Competitive salary, comprehensive benefits package, professional development opportunities, and the chance to make a difference in your community.</p>
        
        <p>To apply, send your CV and cover letter to careers@gebetasaccos.com by January 31st, 2024.</p>
      `,
      image: "/gallery/team-1.jpg",
      author: "HR Department",
      publishDate: "2024-01-08",
      readTime: "4 min read",
      views: 654,
      tags: ["Jobs", "Loan Officer", "Career"],
    },
  ]

  useEffect(() => {
    const articleId = Number.parseInt(params.id as string)
    const foundArticle = newsData.find((article) => article.id === articleId)

    if (foundArticle) {
      setArticle(foundArticle)
      setViews(foundArticle.views + Math.floor(Math.random() * 10) + 1) // Simulate dynamic views
    }
  }, [params.id])

  const handleShare = async (platform: string) => {
    if (!article) return

    const url = window.location.href
    const text = `${article.title} - ${article.excerpt}`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          toast({
            title: "Link copied!",
            description: "Article link has been copied to clipboard.",
          })
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          toast({
            title: "Failed to copy",
            description: "Please copy the link manually.",
            variant: "destructive",
          })
        }
        break
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="ghost" asChild className="text-blue-600 hover:text-blue-700">
              <Link href="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-blue-100 text-blue-800">
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{views.toLocaleString()} views</span>
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              {/* Share Article */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Article
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleShare("facebook")}>
                      <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                      Facebook
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleShare("twitter")}>
                      <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                      Twitter
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleShare("linkedin")}>
                      <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleShare("copy")}>
                      {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Article Stats */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Views</span>
                      <span className="font-semibold">{views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Reading Time</span>
                      <span className="font-semibold">{article.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Published</span>
                      <span className="font-semibold">{new Date(article.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {newsData
                      .filter((item) => item.id !== article.id)
                      .slice(0, 3)
                      .map((relatedArticle) => (
                        <Link key={relatedArticle.id} href={`/news/${relatedArticle.id}`} className="block group">
                          <div className="flex space-x-3">
                            <Image
                              src={relatedArticle.image || "/placeholder.svg"}
                              alt={relatedArticle.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {relatedArticle.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(relatedArticle.publishDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/news">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All News
                </Link>
              </Button>

              <div className="flex space-x-4">
                {newsData.map((item, index) => {
                  const currentIndex = newsData.findIndex((a) => a.id === article.id)
                  const prevArticle = newsData[currentIndex - 1]
                  const nextArticle = newsData[currentIndex + 1]

                  return null
                })}

                {(() => {
                  const currentIndex = newsData.findIndex((a) => a.id === article.id)
                  const prevArticle = newsData[currentIndex - 1]
                  const nextArticle = newsData[currentIndex + 1]

                  return (
                    <>
                      {prevArticle && (
                        <Button variant="outline" asChild>
                          <Link href={`/news/${prevArticle.id}`}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                          </Link>
                        </Button>
                      )}
                      {nextArticle && (
                        <Button asChild>
                          <Link href={`/news/${nextArticle.id}`}>
                            Next
                            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                          </Link>
                        </Button>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
