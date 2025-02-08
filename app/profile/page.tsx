'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NavBar from '@/components/ui/NavBar';

export default function Profile() {


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavBar/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This is your personal Profile. You can manage your account and settings here.
                </p>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Account Status</p>
                    <p className="mt-1 text-lg font-semibold text-green-600">Active</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                    <p className="mt-1 text-lg font-semibold">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Edit Profile
                  </Button>
                  <Button className="w-full" variant="outline">
                    Security Settings
                  </Button>
                  <Button className="w-full" variant="outline">
                    Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}