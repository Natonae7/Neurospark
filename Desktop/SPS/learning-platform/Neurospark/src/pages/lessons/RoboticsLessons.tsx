import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roboticsTopics = [
  { title: "Introduction to Robotics", description: "Learn the basics of robotics systems, sensors, and actuators." },
  { title: "Robotic Arm Simulation", description: "Control a simple robotic arm using JavaScript!" },
  { title: "Autonomous Navigation", description: "How robots move and navigate their environment autonomously." },
  { title: "Sensors and Feedback", description: "Learn how robots use sensors to interact with the world." },
];

const RoboticsLessons = () => {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Robotics Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roboticsTopics.map((lesson, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{lesson.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoboticsLessons;
