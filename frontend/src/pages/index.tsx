import Link from 'next/link'
import { UserButton, SignInButton, SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gavel, Video, Users, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Gavel className="h-6 w-6" />
            <span className="text-xl font-bold">DebateModPro.ai</span>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button size="lg" variant="outline" asChild>
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary to-primary/50 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Moderate Debates with Confidence</h1>
            <p className="text-xl mb-8">Streamline your video debates with our powerful moderation tools</p>
            <Button size="lg" asChild>
              <Link href="/start-debate">Start a Debate</Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose DebateModPro?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Video className="h-10 w-10" />}
                title="High-Quality Video"
                description="Crystal clear video and audio for seamless debates"
              />
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Multiple Participants"
                description="Host debates with up to 10 participants simultaneously"
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10" />}
                title="Time Management"
                description="Built-in timers and turn management for structured debates"
              />
            </div>
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Debates?</h2>
            <p className="text-xl mb-8">Join thousands of moderators who trust DebateModPro</p>
            <Button size="lg" variant="secondary" asChild>
              <SignUpButton> Sign Up Now </SignUpButton>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 DebateModPro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}