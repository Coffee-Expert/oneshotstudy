"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Users,
  BookOpen,
  Target,
  Heart,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";

const fadeInUp = {
  initial: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <main className="flex-1">
        <motion.section
          className="container py-8 md:py-12 px-4 md:px-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Back Button */}
          <div className="mb-6">
            <BackButton href="/" label="Back to Home" />
          </div>

          {/* Hero Section */}
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 relative text-stone-800">
              About One Shot Engineer
              {/* Handmade underline */}
              <svg
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-80 h-6"
                viewBox="0 0 400 25"
                fill="none"
              >
                <path
                  d="M20 18 Q 100 8 200 15 Q 300 22 380 12"
                  stroke="#78716c"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Empowering engineering students with comprehensive study
              resources, practical guidance, and a supportive community to
              achieve academic and career success.
            </p>
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div
            className="grid gap-8 md:grid-cols-3 mb-16"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full border bg-background/80 backdrop-blur-sm p-6 transition-colors">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <CardTitle className="text-foreground">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    To democratize quality engineering education by providing
                    accessible, comprehensive, and practical learning resources
                    that bridge the gap between academic theory and industry
                    requirements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border bg-background/80 backdrop-blur-sm p-6 transition-colors">
              <CardHeader className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <CardTitle className="text-foreground">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    To become the go-to platform for engineering students
                    worldwide, fostering a community where knowledge sharing,
                    practical learning, and career growth thrive together.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border bg-background/80 backdrop-blur-sm p-6 transition-colors">
              <CardHeader className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <CardTitle className="text-foreground">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    Excellence in education, accessibility for all,
                    community-driven growth, practical application of knowledge,
                    and continuous innovation in learning methodologies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
          >
            {/* Get in Touch */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-stone-200 bg-stone-100/80 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2 text-stone-800">
                    <Mail className="h-5 w-5" />
                    Get in Touch
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Have questions or need support? We&apos;re here to help!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>contact@oneshotengineer.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+91 XXXXX XXXXX</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>India</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-6 border-stone-300 text-stone-700 hover:bg-stone-200"
                  >
                    <Link href="mailto:contact@oneshotengineer.com">
                      Send Email
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Enquiries */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-stone-200 bg-stone-100/80 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2 text-stone-800">
                    <Users className="h-5 w-5" />
                    Business Enquiries
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Interested in partnerships or collaborations?
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We welcome partnerships with educational institutions,
                    companies, and content creators who share our vision of
                    making quality engineering education accessible to all.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Content partnerships</li>
                    <li>• Institutional collaborations</li>
                    <li>• Sponsorship opportunities</li>
                    <li>• Guest lecture arrangements</li>
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-6 border-stone-300 text-stone-700 hover:bg-stone-200"
                  >
                    <Link href="mailto:business@oneshotengineer.com">
                      Contact Business Team
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Community Section */}
          <motion.div className="mt-16 text-center" variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6 text-stone-800">
              Join Our Community
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect with thousands of engineering students, share knowledge,
              and grow together in our supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-stone-300 hover:bg-stone-100 text-stone-700 px-8 py-4"
              >
                <Link
                  href="https://chat.whatsapp.com/invite/engineering-community"
                  target="_blank"
                >
                  Join WhatsApp Group
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-stone-700 hover:bg-stone-800 text-stone-100 px-8 py-4"
              >
                <Link
                  href="https://www.youtube.com/@OneShotEngineer"
                  target="_blank"
                >
                  Subscribe on YouTube
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  );
}
