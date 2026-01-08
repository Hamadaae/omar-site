"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Calendar,
  Layers,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface Project {
  _id: string;
  title: string;
  period: string;
  description: string;
  technologies: string[];
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setTitle("");
    setPeriod("");
    setDescription("");
    setTechnologies("");
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setPeriod(project.period);
    setDescription(project.description);
    setTechnologies(project.technologies.join(", "));
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title,
      period,
      description,
      technologies: technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        const data = await res.json();

        if (data.success) {
          toast.success("Project updated successfully");
          fetchProjects();
          resetForm();
        } else {
          toast.error(data.error || "Failed to update project");
        }
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        const data = await res.json();

        if (data.success) {
          toast.success("Project created successfully");
          fetchProjects();
          resetForm();
        } else {
          toast.error(data.error || "Failed to create project");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Project deleted successfully");
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.error || "Failed to delete project");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "var(--color-admin-primary)" }}
          />
          <span style={{ color: "var(--color-admin-text-muted)" }}>
            Loading projects...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-admin-text)" }}
          >
            Projects
          </h1>
          <p
            style={{ color: "var(--color-admin-text-muted)" }}
            className="mt-1"
          >
            Manage your portfolio projects
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="gap-2 text-white"
          style={{ backgroundColor: "var(--color-admin-primary)" }}
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "var(--color-admin-text-muted)" }}
          />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            style={{
              backgroundColor: "var(--color-admin-surface)",
              borderColor: "var(--color-admin-border)",
              color: "var(--color-admin-text)",
            }}
          />
        </div>
        <div
          className="flex items-center gap-6 text-sm"
          style={{ color: "var(--color-admin-text-muted)" }}
        >
          <span>
            <strong style={{ color: "var(--color-admin-text)" }}>
              {projects.length}
            </strong>{" "}
            total projects
          </span>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-full max-w-lg rounded-xl shadow-lg"
            style={{
              backgroundColor: "var(--color-admin-surface)",
              border: "1px solid var(--color-admin-border)",
            }}
          >
            <div
              className="flex items-center justify-between p-6"
              style={{ borderBottom: "1px solid var(--color-admin-border)" }}
            >
              <div className="flex items-center gap-3">
                {editingProject ? (
                  <Pencil
                    className="h-5 w-5"
                    style={{ color: "var(--color-admin-primary)" }}
                  />
                ) : (
                  <Plus
                    className="h-5 w-5"
                    style={{ color: "var(--color-admin-primary)" }}
                  />
                )}
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-admin-text)" }}
                >
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <Label style={{ color: "var(--color-admin-text)" }}>
                  Title
                </Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Project title"
                  required
                  style={{
                    backgroundColor: "var(--color-admin-bg)",
                    borderColor: "var(--color-admin-border)",
                    color: "var(--color-admin-text)",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="flex items-center gap-2"
                  style={{ color: "var(--color-admin-text)" }}
                >
                  <Calendar className="h-4 w-4" /> Period
                </Label>
                <Input
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="e.g., Jan 2024 - Mar 2024"
                  required
                  style={{
                    backgroundColor: "var(--color-admin-bg)",
                    borderColor: "var(--color-admin-border)",
                    color: "var(--color-admin-text)",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label style={{ color: "var(--color-admin-text)" }}>
                  Description
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project description..."
                  rows={4}
                  required
                  style={{
                    backgroundColor: "var(--color-admin-bg)",
                    borderColor: "var(--color-admin-border)",
                    color: "var(--color-admin-text)",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="flex items-center gap-2"
                  style={{ color: "var(--color-admin-text)" }}
                >
                  <Layers className="h-4 w-4" /> Technologies (comma-separated)
                </Label>
                <Input
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                  style={{
                    backgroundColor: "var(--color-admin-bg)",
                    borderColor: "var(--color-admin-border)",
                    color: "var(--color-admin-text)",
                  }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                  style={{
                    borderColor: "var(--color-admin-border)",
                    color: "var(--color-admin-text)",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 text-white"
                  style={{ backgroundColor: "var(--color-admin-primary)" }}
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div
          className="text-center py-16 rounded-xl"
          style={{
            border: "2px dashed var(--color-admin-border)",
            backgroundColor: "var(--color-admin-surface)",
          }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: "var(--color-admin-accent-light)" }}
          >
            <Layers
              className="h-8 w-8"
              style={{ color: "var(--color-admin-primary)" }}
            />
          </div>
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: "var(--color-admin-text)" }}
          >
            {searchQuery ? "No projects found" : "No projects yet"}
          </h3>
          <p
            style={{ color: "var(--color-admin-text-muted)" }}
            className="mb-6"
          >
            {searchQuery
              ? "Try adjusting your search"
              : "Create your first project to get started"}
          </p>
          {!searchQuery && (
            <Button
              onClick={() => setShowForm(true)}
              className="gap-2 text-white"
              style={{ backgroundColor: "var(--color-admin-primary)" }}
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="group p-5 rounded-xl transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-admin-surface)",
                border: "1px solid var(--color-admin-border)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3
                  className="text-base font-semibold line-clamp-1"
                  style={{ color: "var(--color-admin-text)" }}
                >
                  {project.title}
                </h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(project)}
                    className="h-8 w-8"
                    style={{ color: "var(--color-admin-primary)" }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(project._id)}
                    className="h-8 w-8 hover:text-red-500"
                    style={{ color: "var(--color-admin-text-muted)" }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                className="flex items-center gap-2 text-sm mb-3"
                style={{ color: "var(--color-admin-text-muted)" }}
              >
                <Calendar className="h-4 w-4" />
                <span>{project.period}</span>
              </div>
              <p
                className="text-sm line-clamp-2 mb-4"
                style={{ color: "var(--color-admin-text-muted)" }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge
                    key={tech}
                    className="text-xs"
                    style={{
                      backgroundColor: "var(--color-admin-primary-light)",
                      color: "var(--color-admin-text)",
                    }}
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor: "var(--color-admin-border)",
                      color: "var(--color-admin-text-muted)",
                    }}
                  >
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
