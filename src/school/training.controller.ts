import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { SubjectService } from './subject.service';
import { Teacher } from './teacher.entity';
import { Subject } from './subject.entity';

@Controller('training')
export class TrainingController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly subjectService: SubjectService,
  ) {}

  

  @Post('subject')
  async createSubject(@Body() createSubjectDto: { name: string }): Promise<Subject> {
    return this.subjectService.create(createSubjectDto);
  }

  @Get('teachers')
  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get('subjects')
  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }
}
