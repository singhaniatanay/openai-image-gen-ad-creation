import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react'; // Example icon
import { Link } from 'react-router-dom'; // <-- Add Link import

export function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Dashboard</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user.email}</span>
            <Button onClick={signOut} variant="outline" size="sm">Sign Out</Button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Placeholder Card 1: Create New Ad */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">New Ad Creative</CardTitle>
              <PlusCircle className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Get Started</div>
              <p className="text-xs text-muted-foreground">
                Launch the AI ad generator.
              </p>
              {/* TODO: Add logic to disable or redirect if no brand kit exists */}
              <Button className="mt-4 w-full">Create Ad</Button>
            </CardContent>
          </Card>

          {/* Placeholder Card 2: Manage Brand Kits - MODIFIED */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Brand Kits</CardTitle>
              {/* Icon for brand kits */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">
                View and edit your brand assets.
              </p>
              <Link to="/dashboard/brand-kits" className="w-full">
                <Button variant="outline" className="mt-4 w-full">View Brand Kits</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Placeholder Card 3: Recent Activity (Example) */}
          <Card className="md:col-span-2 lg:col-span-1 xl:col-span-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Overview of your latest actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Generated "Summer Sale Campaign" - 2 hours ago</li>
                <li>Updated "My Awesome Brand" kit - 1 day ago</li>
                <li>Viewed performance for "XMas Special Ad" - 3 days ago</li>
              </ul>
            </CardContent>
          </Card>

          {/* Add more cards or sections as needed */}
        </div>
      </main>
    </div>
  );
}