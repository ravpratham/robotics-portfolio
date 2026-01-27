import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Plus, Trash2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const AssignmentsSection = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Assignment 1',
      description: 'Content will be updated soon',
      isEmpty: true
    },
    {
      id: 2,
      title: 'Assignment 2',
      description: 'Content will be updated soon',
      isEmpty: true
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: ''
  });

  const handleAddAssignment = () => {
    if (newAssignment.title.trim()) {
      const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
      setAssignments([
        ...assignments,
        {
          id: newId,
          title: newAssignment.title,
          description: newAssignment.description || 'Content will be updated soon',
          isEmpty: !newAssignment.description
        }
      ]);
      setNewAssignment({ title: '', description: '' });
      setIsDialogOpen(false);
    }
  };

  const handleRemoveAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  return (
    <section className="min-h-screen px-4 py-20 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Course <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Assignments</span>
          </h2>
          <p className="text-lg text-gray-400 md:text-xl">
            Track your progress through hands-on robotics projects
          </p>
        </div>

        {/* Assignments Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {assignments.length === 0 ? (
            <div className="col-span-2 flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-800 bg-black/30 p-12 text-center">
              <FileText className="mb-4 h-16 w-16 text-gray-600" />
              <p className="text-xl text-gray-500">No assignments yet</p>
              <p className="mt-2 text-gray-600">
                Click the "Add Assignment" button below to create your first assignment
              </p>
            </div>
          ) : (
            assignments.map((assignment) => (
              <Card
                key={assignment.id}
                className="group relative overflow-hidden border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Gradient accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Delete button */}
                <button
                  onClick={() => handleRemoveAssignment(assignment.id)}
                  className="absolute right-4 top-4 z-20 rounded-full bg-red-500/10 p-2 text-red-400 opacity-0 transition-all duration-300 hover:bg-red-500/20 hover:text-red-300 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Delete assignment"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                
                <CardHeader className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-400">
                      Section {assignment.id}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors">
                    {assignment.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {assignment.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative">
                  {assignment.isEmpty && (
                    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-800 bg-black/30 p-8 text-center">
                      <Plus className="mb-4 h-12 w-12 text-gray-600" />
                      <p className="text-gray-500">No content yet</p>
                      <p className="mt-2 text-sm text-gray-600">
                        Content will be added as the course progresses
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add Assignment Button */}
        <div className="mt-12 text-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Assignment</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new assignment section. You can update the content later.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Assignment Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Assignment 3"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the assignment..."
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500 min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setNewAssignment({ title: '', description: '' });
                  }}
                  className="border-gray-800 text-gray-400 hover:bg-gray-900 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAssignment}
                  disabled={!newAssignment.title.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                >
                  Add Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default AssignmentsSection;