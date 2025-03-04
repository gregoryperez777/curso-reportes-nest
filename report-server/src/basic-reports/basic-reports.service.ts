import path from 'path';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport, getEmploymentLetterReport, getEmploymentLetterByIdReport } from '../reports';

// TODO esto sera optimizado despues

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    constructor (private readonly printerService: PrinterService) {
        super();
    };

    helloworld() {
        const docDefinition = getHelloWorldReport({ name: 'Gregory Perez' });

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    employmentLetter() {
        const docDefinition = getEmploymentLetterReport();

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    async employmentLetterById(employeeId: number) {

        const employee = await this.employees.findUnique({
            where: {
                id: employeeId
            }
        });
 
        if (!employee) {
            throw new NotFoundException(`Employee with id ${employeeId} not found`)
        }

        const docDefinition = getEmploymentLetterByIdReport({
            employerName: 'Fernando Herrera',
            employerPosition: 'Gerente de RRHH',
            employeeName: employee.name ,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: 'Tucan Code Cord.',
        });

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

}
