'use client'
import styles from './page.module.css'
import AttendanceTable from './AttendanceTable'
import { ClassRooms, allClasses } from '@/constants'
import { Card, CardBody, ChakraProvider, Heading, Select, Textarea, Text, HStack, Button, Input, Alert, AlertIcon, VStack, Center } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { exportPdf } from './helpers'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'

const PASSWORD = 'GOSPEL'

export default function Home() {
  const [classSelected, setClassSelected] = useState<ClassRooms>(ClassRooms.INSPIRATION)
  const classTitles = Object.keys(allClasses)
  const [teacher, setTeacher] = useState('')
  const [teacherSupport, setTeacherSupport] = useState('')
  const [error, setError] = useState({ teacher: '', teacherSupport: '' })
  const [enteredPassword, setEnteredPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [date, setDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false)

  const currentClass = allClasses[classSelected]
  const [isAllowedTime, setIsAllowedTime] = useState(false);

  const checkTime = () => {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Convert time to minutes for easier comparison
    const currentTimeInMinutes = hours * 60 + minutes;
    const startTimeInMinutes = 11 * 60; // 11:00 AM
    const endTimeInMinutes = 15 * 60 + 0; // 3:00 PM

    return day === 0 && currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
  };

  const isTimeAllowed = useMemo(checkTime, []);

  useEffect(() => {
    setIsAllowedTime(isTimeAllowed);
    // Recheck every minute
    const interval = setInterval(() => {
      setIsAllowedTime(checkTime());
    }, 60000);

    return () => clearInterval(interval);
  }, [isTimeAllowed]);

  const handleSubmit = () => {
    let isValid = true;
    if (!teacher.trim()) {
      setError(prev => ({ ...prev, teacher: 'Teacher name is required' }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, teacher: '' }));
    }

    if (!teacherSupport.trim()) {
      setError(prev => ({ ...prev, teacherSupport: 'Teacher support name is required' }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, teacherSupport: '' }));
    }

    if (isValid) {
      setSubmitted(true)
      exportPdf({ teacher, teacherSupport, classRoom: classSelected }); // Only call exportPdf if the form is valid
      setSubmitted(true)
      setTeacher('')
      setTeacherSupport('')
    }
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (submitted) {
    return(
    <ChakraProvider>
      <Center height="100vh" padding={20}>
        <Text fontSize="xl">Thank you for sumbitting your class register</Text>
      </Center>
    </ChakraProvider>)
  }

  // if (!isAllowedTime) {
  //   return (
  //     <ChakraProvider>
  //       <Center height="100vh" padding={20}>
  //         <Text fontSize="xl">Sorry, this website is only accessible on Sundays from 11:00 AM to 2:30 PM. Please come back again!</Text>
  //       </Center>
  //     </ChakraProvider>
  //   );
  // }

  if (!isAuthenticated) {
    return (
      <ChakraProvider>
        <VStack padding={40} spacing={4} align="center" justify="center" height="100vh">
          <Text>Please Enter Password to Access</Text>
          <Input
            type="password"
            placeholder="Enter Password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </VStack>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <main id='main' className={styles.main}>
        <header className={styles.header}>
          <Heading>Sunday School Attendance Register</Heading>
        </header>

        <Card marginBottom={10}>
          <CardBody>
            <HStack spacing={20}>
              <div style={{ width: 200, display: 'flex', flexDirection: 'row' }}>
                <Center marginRight={2}> <Text verticalAlign='bottom' style={{ verticalAlign: 'center' }}>Class:</Text></Center>
                <Select value={classSelected} onChange={e => setClassSelected(e.target.value)}>
                  {classTitles.map(title => <option key={title} value={title}>{title}</option>)}
                </Select>
              </div>
              <div style={{ width: 200, display: 'flex', flexDirection: 'row' }}>
                <Center marginRight={2}> <Text verticalAlign='bottom' style={{ verticalAlign: 'center' }}> Date:</Text></Center><SingleDatepicker
                  name="date-input"
                  date={date}
                  onDateChange={setDate}
                  configs={{ dateFormat: 'dd-MM-yyyy' }}
                />
              </div>
            </HStack>

            <HStack spacing={10} marginTop={5} marginLeft={1}>
              <Input htmlSize={30} placeholder='Teacher Name' width='auto' value={teacher} onChange={e => setTeacher(e.target.value)} />
              {error.teacher && <Alert status='error'><AlertIcon />{error.teacher}</Alert>}
              <Input htmlSize={30} placeholder='Teacher Support' width='auto' value={teacherSupport} onChange={e => setTeacherSupport(e.target.value)} />
              {error.teacherSupport && <Alert status='error'><AlertIcon />{error.teacherSupport}</Alert>}
            </HStack>
            <HStack spacing={10} marginTop={5} marginLeft={1}>
              <Text> Legend: <b>P = Present, A = Absent, P/T = Present but with parent, B = Bible</b></Text>
            </HStack>
          </CardBody>
        </Card>

        <AttendanceTable data={currentClass} submitted={submitted} />
        <Textarea marginTop={5} placeholder='Comments' />

        <Button
          size='md'
          height='48px'
          width='200px'
          border='2px'
          borderColor='green.500'
          marginTop={5}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </main>
    </ChakraProvider>
  )
}