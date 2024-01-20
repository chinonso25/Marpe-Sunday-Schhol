'use client'
import styles from './page.module.css'
import AttendanceTable from './AttendanceTable'
import { ClassRooms, allClasses, } from '@/constants'
import { Box, Card, CardBody, ChakraProvider, Heading, Select, Textarea, Text, HStack, Button } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Home() {
  const [classSelected, setClassSelected] = useState<ClassRooms>(ClassRooms.INSPIRATION)
  const classTitles = Object.keys(allClasses)

  const currentClass = allClasses[classSelected]

  const exportPdf = async () => {
    const element = document.getElementById('hi'); // ID of your element
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpeg',.75);

    // Initialize jsPDF - Consider adjusting the dimensions to match your content
    const pdf = new jsPDF({
      orientation: 'portrait', // or 'portrait'
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    // Add the canvas data as an image to the PDF
    pdf.addImage(data, 'PNG', 0, 0, canvas.width, canvas.height);

    // Save the PDF
    pdf.save('download.pdf');
  };



  return (
    <ChakraProvider>
      <main id='main' className={styles.main}>
        <header className={styles.header}>

          <Heading>Sunday School Attendance Register</Heading>
        </header>

        <Card marginBottom={10}>
          <CardBody>
            <HStack>
              <Text> <Select value={classSelected} onChange={e => setClassSelected(e.target.value)}>
                {classTitles.map(title => <option key={title} value={title}>{title}</option>)}
              </Select></Text>
              <Text>Date: {new Date().toDateString()}</Text>

            </HStack>
          </CardBody>
        </Card>



        <AttendanceTable data={currentClass} />
        <Textarea marginTop={5} placeholder='Comments' />

        <Button
          size='md'
          height='48px'
          width='200px'
          border='2px'
          borderColor='green.500'
          marginTop={5}
          onClick={exportPdf}
        >
          Submit
        </Button>
      </main>
    </ChakraProvider>

  )
}
