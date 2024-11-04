import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingController } from './training.controller';
import { Teacher } from './teacher.entity';
import { Subject } from './subject.entity';

import { TeacherService } from './teacher.service';
import { SubjectService } from './subject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Subject]),
  ],
  controllers: [TrainingController],
  providers: [TeacherService, SubjectService],
})
export class SchoolModule {}
