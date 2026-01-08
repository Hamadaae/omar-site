import "reflect-metadata";
import { container } from "tsyringe";

// Repositories
import { ProjectRepository } from "../features/project/project.repository";
import { ContactRepository } from "../features/contact/contact.repository";

// Services
import { ProjectService } from "../features/project/project.service";
import { ContactService } from "../features/contact/contact.service";

// Controllers
import { ProjectController } from "../features/project/project.controller";
import { ContactController } from "../features/contact/contact.controller";

// Register repositories
container.registerSingleton("IProjectRepository", ProjectRepository);
container.registerSingleton("IContactRepository", ContactRepository);

// Register services
container.registerSingleton("IProjectService", ProjectService);
container.registerSingleton("IContactService", ContactService);

// Register controllers
container.registerSingleton(ProjectController, ProjectController);
container.registerSingleton(ContactController, ContactController);

export { container as rootContainer } from "tsyringe";
