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
    const data = canvas.toDataURL('image/jpeg', 0.75);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(data, 'JPEG', 0, 0, canvas.width, canvas.height);

    // Convert PDF to Blob and append to FormData
    const pdfBlob = pdf.output('blob')
    const formData = new FormData();
    formData.append('pdf-file', pdfBlob, 'download.pdf');

    // Send the PDF
    sendPdf(formData);

  };

  async function sendPdf(formData: FormData) {
    try {
      const response = await fetch('/api/Attendance', {
        method: 'post',
        body: formData,
      });

      if (!response.ok) {
        console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData['message']);

      alert('Message successfully sent');
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
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
