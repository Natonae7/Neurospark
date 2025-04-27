
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BookOpen, Clock, Users } from "lucide-react";
import { InfoCard } from "@/components/ui/info-card";
import { ActivityCard } from "@/components/ui/activity-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const performanceData = [
  { subject: 'Math', score: 86 },
  { subject: 'Science', score: 79 },
  { subject: 'English', score: 91 },
  { subject: 'History', score: 72 },
  { subject: 'Art', score: 88 },
];

const recentActivities = [
  {
    title: "Quiz Results Published",
    description: "Math Quiz 3 results are now available for Class 8B",
    time: "1 hour ago",
    icon: <BarChart size={20} />,
    type: "success",
    badge: "Math"
  },
  {
    title: "New Assignment Submitted",
    description: "5 students submitted their Science project reports",
    time: "3 hours ago",
    icon: <BookOpen size={20} />,
    type: "info",
    badge: "Science"
  },
  {
    title: "Class Attendance",
    description: "3 students were absent in today's English class",
    time: "5 hours ago",
    icon: <Users size={20} />,
    type: "warning",
    badge: "English"
  },
  {
    title: "Deadline Approaching",
    description: "History assignment deadline is tomorrow",
    time: "1 day ago",
    icon: <Clock size={20} />,
    type: "default",
    badge: "History"
  },
];

const TeacherDashboard = () => {
  return (
    <AppShell userType="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Ms. Johnson!</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            title="Total Students"
            value="126"
            icon={<Users size={18} />}
            description="Across all classes"
            trend={{ value: 4, isPositive: true }}
          />
          
          <InfoCard
            title="Average Score"
            value="84.2%"
            icon={<BarChart size={18} />}
            description="All subjects"
            trend={{ value: 2.1, isPositive: true }}
          />
          
          <InfoCard
            title="Active Courses"
            value="8"
            icon={<BookOpen size={18} />}
            description="3 in progress"
          />
          
          <InfoCard
            title="Assignments"
            value="24"
            icon={<Clock size={18} />}
            description="12 need grading"
            trend={{ value: 8, isPositive: false }}
          />
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="top-students">Top Students</TabsTrigger>
            <TabsTrigger value="support-needed">Support Needed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentActivities.map((activity, idx) => (
                    <ActivityCard key={idx} {...activity} />
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Subject Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4 pt-4">
                  <ProgressRing 
                    progress={78} 
                    size={180} 
                    color="#1E90FF"
                    textClassName="text-2xl"
                  />
                  <div className="text-center">
                    <p className="text-lg font-medium">Average Completion</p>
                    <p className="text-sm text-muted-foreground">
                      Across all subjects
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance by Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#1E90FF" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="top-students">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Top students list would appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support-needed">
            <Card>
              <CardHeader>
                <CardTitle>Students Needing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Students requiring additional attention would appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
};

export default TeacherDashboard;
