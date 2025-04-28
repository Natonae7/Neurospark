import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const aiTopics = [
  { title: "Introduction to Artificial Intelligence", description: "Explore the history, goals, and applications of AI." },
  { title: "Machine Learning Basics", description: "Understand supervised and unsupervised learning algorithms." },
  { title: "Neural Networks 101", description: "Dive into how neural networks mimic human brains." },
  { title: "AI in Daily Life", description: "Discover how AI impacts healthcare, finance, and education." },
];

const AILessons = () => {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">AI Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiTopics.map((lesson, index) => (
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

export default AILessons;
