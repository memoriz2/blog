import { prisma } from "@/lib/prisma";
import { Greeting } from "@prisma/client";
import {
  GreetingCreateRequest,
  GreetingUpdateRequest,
  GreetingResponse,
} from "@/types/greeting";
import { IFilterableRepository } from "./baseRepository";
import { Id } from "@/types/utils";

export class GreetingRepository
  implements
    IFilterableRepository<
      Greeting,
      Record<string, unknown>,
      GreetingCreateRequest,
      GreetingUpdateRequest
    >
{
  async findAll(): Promise<Greeting[]> {
    try {
      return await prisma.greeting.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      throw new Error(`Failed to fetch greetings: ${error}`);
    }
  }

  async findById(id: Id): Promise<Greeting | null> {
    try {
      return await prisma.greeting.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to fetch greeting with id ${id}: ${error}`);
    }
  }

  async create(data: GreetingCreateRequest): Promise<Greeting> {
    try {
      return await prisma.greeting.create({
        data: {
          title: data.title,
          content: data.content,
          isActive: data.isActive ?? true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create greeting: ${error}`);
    }
  }

  async update(id: Id, data: GreetingUpdateRequest): Promise<Greeting> {
    try {
      return await prisma.greeting.update({
        where: { id },
        data: {
          ...(data.title !== undefined && { title: data.title }),
          ...(data.content !== undefined && { content: data.content }),
          ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
      });
    } catch (error) {
      throw new Error(`Failed to update greeting with id ${id}: ${error}`);
    }
  }

  async delete(id: Id): Promise<void> {
    try {
      await prisma.greeting.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete greeting with id ${id}: ${error}`);
    }
  }

  async exists(id: Id): Promise<boolean> {
    try {
      const greeting = await prisma.greeting.findUnique({
        where: { id },
        select: { id: true },
      });
      return !!greeting;
    } catch (error) {
      throw new Error(
        `Failed to check greeting existence with id ${id}: ${error}`
      );
    }
  }

  async findByFilters(filters: Record<string, unknown>): Promise<Greeting[]> {
    try {
      const where: Record<string, unknown> = {};

      if (filters.isActive !== undefined) {
        where.isActive = filters.isActive;
      }

      if (filters.search) {
        where.OR = [
          {
            title: { contains: filters.search as string, mode: "insensitive" },
          },
          {
            content: {
              contains: filters.search as string,
              mode: "insensitive",
            },
          },
        ];
      }

      return await prisma.greeting.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      throw new Error(`Failed to fetch greetings with filters: ${error}`);
    }
  }

  async findWithPagination(
    page: number,
    limit: number
  ): Promise<{
    data: Greeting[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const skip = page * limit;

      const [greetings, total] = await Promise.all([
        prisma.greeting.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.greeting.count(),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: greetings,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch greetings with pagination: ${error}`);
    }
  }

  async findActive(): Promise<Greeting[]> {
    try {
      return await prisma.greeting.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      throw new Error(`Failed to fetch active greetings: ${error}`);
    }
  }

  async toggleActive(id: Id): Promise<Greeting> {
    try {
      const greeting = await prisma.greeting.findUnique({ where: { id } });
      if (!greeting) {
        throw new Error("Greeting not found");
      }

      return await prisma.greeting.update({
        where: { id },
        data: { isActive: !greeting.isActive },
      });
    } catch (error) {
      throw new Error(`Failed to toggle greeting active status: ${error}`);
    }
  }

  toResponse(greeting: Greeting): GreetingResponse {
    return {
      id: greeting.id,
      title: greeting.title,
      content: greeting.content,
      isActive: greeting.isActive,
      createdAt: greeting.createdAt.toISOString(),
      updatedAt: greeting.updatedAt.toISOString(),
    };
  }
}
