
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BarChart, Award, Clock } from "lucide-react";
import { InfoCard } from "@/components/ui/info-card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Badge } from "@/components/ui/badge";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const subjectPerformance = [
  { subject: 'Math', score: 92 },
  { subject: 'Science', score: 85 },
  { subject: 'English', score: 76 },
  { subject: 'History', score: 88 },
  { subject: 'Art', score: 94 },
];

const scoreDistribution = [
  { name: '>90', value: 5, color: '#00C896' },
  { name: '80-90', value: 3, color: '#1E90FF' },
  { name: '70-80', value: 2, color: '#A88EFF' },
  { name: '<70', value: 1, color: '#FF8C66' },
];

const completedLessons = [
  {
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    date: "May 24, 2025",
    score: 92,
  },
  {
    title: "The Solar System",
    subject: "Science",
    date: "May 22, 2025",
    score: 88,
  },
  {
    title: "Literary Devices",
    subject: "English",
    date: "May 20, 2025",
    score: 76,
  },
  {
    title: "Ancient Greece",
    subject: "History",
    date: "May 18, 2025",
    score: 94,
  },
];

const StudentDashboard = () => {
  return (
    <AppShell userType="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Alex!</p>
          </div>
          <Button className="bg-electric-blue hover:bg-electric-blue/90">
            Resume Learning
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            title="Overall Progress"
            value="66%"
            icon={<BookOpen size={18} />}
            description="Keep going!"
          />
          
          <InfoCard
            title="Average Score"
            value="85.8%"
            icon={<BarChart size={18} />}
            description="Across all subjects"
            trend={{ value: 3.2, isPositive: true }}
          />
          
          <InfoCard
            title="Top Subject"
            value="Art"
            icon={<Award size={18} />}
            description="94% success rate"
          />
          
          <InfoCard
            title="Completed Lessons"
            value="24"
            icon={<Clock size={18} />}
            description="4 this week"
            trend={{ value: 2, isPositive: true }}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{subject.subject}</span>
                      <span className="text-sm font-medium">{subject.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-electric-blue"
                        style={{ width: `${subject.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedLessons.slice(0, 4).map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-border pb-2">
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        lesson.score >= 90 ? "border-mint-green text-mint-green" :
                        lesson.score >= 80 ? "border-electric-blue text-electric-blue" :
                        lesson.score >= 70 ? "border-soft-purple text-soft-purple" :
                        "border-destructive text-destructive"
                      }`}
                    >
                      {lesson.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={subjectPerformance} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#1E90FF" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Overall Learning Status</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-[200px]">
                <ResponsiveContainer width="100%" aspect={1}>
                  <PieChart>
                    <Pie
                      data={scoreDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                      labelLine={false}
                      label={({ name }) => name}
                    >
                      {scoreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-2">
                  <p className="text-sm text-muted-foreground">Score distribution across subjects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default StudentDashboard;
