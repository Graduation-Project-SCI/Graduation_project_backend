import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'; // Import Request and Response from Express

class ProjectController {
  private prisma = new PrismaClient();

  // Create a new project
  async createProject(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body; // Assuming data is in the request body
      const newProject = await this.prisma.project.create({ data });
      return response.status(201).json(newProject);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  // Get a single project by ID
  async getProjectById(request: Request, response: Response): Promise<Response> {
    try {
      const projectId = parseInt(request.params.projectId); // Assuming projectId is a route parameter
      const project = await this.prisma.project.findUnique({
        where: { projectId },
      });
      if (!project) {
        return response.status(404).json({ message: 'Project not found' });
      }
      return response.json(project);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async getAllProjects(request: Request, response: Response): Promise<Response> {
    try {
      const projects = await this.prisma.project.findMany();
      return response.json(projects);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  // Update a project by ID
  async updateProject(request: Request, response: Response): Promise<Response> {
    try {
      const projectId = parseInt(request.params.projectId); // Assuming projectId is a route parameter
      const data = request.body; // Assuming updated data is in the request body
      const updatedProject = await this.prisma.project.update({
        where: { projectId },
        data,
      });
      return response.json(updatedProject);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async deleteProject(request: Request, response: Response): Promise<Response> {
    try {
      const projectId = parseInt(request.params.projectId); // Assuming projectId is a route parameter
      await this.prisma.project.delete({ where: { projectId } });
      return response.status(200).json({ message: 'Project successfully deleted' });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default ProjectController;
