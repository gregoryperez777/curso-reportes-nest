import type { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";
import { headerSection } from "./sections/header.section";

interface ReportValues {
    employerName: string;
    employerPosition: string;
    employeeName: string;
    employeePosition: string;
    employeeStartDate: Date;
    employeeHours: number;
    employeeWorkSchedule: string;
    employerCompany: string;
}

const style: StyleDictionary = {
    header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 60, 0, 20]
    },
    body: {
        alignment: 'justify',
        margin: [0, 0, 0, 50]
    },
    signature: {
        fontSize: 14,
        bold: true,
        alignment: 'left'

    },
    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
    }
}

// Esto se mudó a Header Section
// const logo: Content = {
//     image: 'src/assets/tucan-code-logo.png',
//     width: 100,
//     height: 100,
//     alignment: 'center',
//     margin: [0, 0, 0, 20]
// } 

export const getEmploymentLetterByIdReport = (values: ReportValues): TDocumentDefinitions => {
    
    const {
        employerName,
        employerPosition,
        employeeName,
        employeePosition,
        employeeStartDate,
        employeeHours,
        employeeWorkSchedule,
        employerCompany
    } = values;
    
    const docDefinition: TDocumentDefinitions = {
        styles: style,

        pageMargins: [40, 60, 40, 60],

        header: headerSection({ showLogo: true, showDate: true }),

        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header'
            },
            {
                text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany},por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(employeeStartDate)}.\n\n Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n\n La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas
                semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.`,
                style: 'body'
            },
            { text: `\n\nAtentamente`, style: 'signature' },
            { text: employerName, style: 'signature' },
            { text: employerPosition, style: 'signature' },
            { text: employerCompany, style: 'signature' },
            { text: DateFormatter.getDDMMMMYYYY(new Date()), style: 'signature' },
        ],
        footer: {
            text: 'Este documento es una constancia de empleo y no representa un compromiso laboral',
            style: 'footer'
        } 
    };

    return docDefinition;
} 