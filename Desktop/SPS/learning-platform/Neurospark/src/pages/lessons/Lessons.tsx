import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";  // Assuming AppShell is used for layout
import { useAuth } from "@/context/AuthContext"; // To get current user info (optional if user info is in context)

const Lessons = () => {
  const { userRole, userName } = useAuth(); // Get current user data

  // Static lesson data for now
  const lessons = [
    {
      title: "Robotics Lessons",
      description:
        "Explore exciting topics like autonomous navigation, sensors, and robotic arms.",
      link: "/lessons/robotics",
    },
    {
      title: "AI Lessons",
      description:
        "Learn about artificial intelligence, machine learning, and real-world AI applications.",
      link: "/lessons/ai",
    },
  ];

  return (
    <AppShell userType="student">
      <div className="container mx-auto py-10 space-y-8">
        <h1 className="text-3xl font-bold">My Lessons</h1>
        <p className="text-muted-foreground mb-8">
          {userName ? `Welcome back, ${userName}! Choose a subject to start or continue learning!` : "Choose a subject to start or continue learning!"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={index} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{lesson.description}</p>
                <Link
                  to={lesson.link}
                  className="text-electric-blue font-semibold hover:underline"
                >
                  View {lesson.title.split(" ")[0]} Lessons →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default Lessons;
