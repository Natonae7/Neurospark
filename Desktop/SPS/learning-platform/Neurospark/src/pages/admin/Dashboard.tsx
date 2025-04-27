import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TeacherAccount {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [teachers, setTeachers] = useState<TeacherAccount[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to create the teacher account
    const newTeacherAccount: TeacherAccount = {
      id: Math.random().toString(36).substring(7),
      name: newTeacher.name,
      email: newTeacher.email,
      createdAt: new Date().toISOString(),
    };
    
    setTeachers((prev) => [...prev, newTeacherAccount]);
    setNewTeacher({ name: "", email: "", password: "" });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => {}}>Logout</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Teacher Account</CardTitle>
          <CardDescription>Add new teacher accounts to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateTeacher} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Teacher Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newTeacher.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newTeacher.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newTeacher.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="mt-4">Create Teacher Account</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Accounts</CardTitle>
          <CardDescription>Manage existing teacher accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{new Date(teacher.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {teachers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No teacher accounts created yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
