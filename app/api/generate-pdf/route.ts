/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {PrismaClient} from '@prisma/client';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


 async function handler(req: Request) {
    try{
        const sales = await prisma.sales.findMany()
        const fixed = await prisma.fixed.findMany()
        const labor = await prisma.labor.findMany()
        const purchases = await prisma.purchase.findMany()
        const variableExpenses = await prisma.variableExpenses.findMany()
        const totals = await prisma.total.findMany()
        const employees = await prisma.employee.findMany()
        const paydate = await prisma.paydate.findMany()
        
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: { [key: string]: any } = {sales, fixed, labor, purchases, variableExpenses, totals, employees, paydate}

      const pdfDoc = await PDFDocument.create()
      let page = pdfDoc.addPage([600,400])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {width, height} = page.getSize()
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const margin = 50;
      let yPosition = height - margin;
      page.drawText('Finance Tracker Report',{
        x: margin,
        y: yPosition,
        size: 24,
        font: timesRomanFont,
        color: rgb(0, 0, 0.8),
      });
      yPosition -= 30;
      const sectionHeader = (text: string) => {
        page.drawText(text, {
          x: margin,
          y: yPosition,
          size: 18,
          font: timesRomanFont,
          color: rgb(0.8, 0, 0),
        });
        yPosition -= 20;
      };

      Object.keys(data).forEach((key) => {
        sectionHeader(key.charAt(0).toUpperCase() + key.slice(1));
        const items = data[key];
        items.forEach((item: any) => {
          const itemText = JSON.stringify(item, null, 2); // Pretty-print JSON
          const lines = itemText.split('\n');
          lines.forEach((line) => {
            page.drawText(line, {
              x: margin + 20,
              y: yPosition,
              size: 12,
              font: timesRomanFont,
              color: rgb(0, 0, 0),
            });
            yPosition -= 15;
            if (yPosition <= margin) {
              // Add a new page if the current page is full
              page = pdfDoc.addPage([width, height]);
              yPosition = height - margin;
            }
          });
        });
        yPosition -= 10; // Add space between sections
      });

        const pdfBytes = await pdfDoc.save()

        const response = new NextResponse(pdfBytes, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=report.pdf'
            },
            status: 200
        });
        return response;
    } catch (e) {
        console.log(e);
        return new NextResponse(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
       
    }
}

export {handler as GET, handler as POST}