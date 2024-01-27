import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td, Text, Input } from '@chakra-ui/react';
import { Student } from '@/constants';

const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <input type="checkbox" checked={checked} onChange={onChange} />
);

const TextInput = ({ value, onChange }: { value: string; onChange: () => void }) => (
  <Input
    type="text"
    value={value}
    onChange={onChange}
    borderWidth={0}
  />
);

const AttendanceTable = ({ data, submitted }: { data: Student[], submitted: boolean }) => {
  const initializeState = () => {
    const mappedData = data.map(student => ({
      ...student,
      P: false, A: false, T: false, B: false, notes: ''
    }));

    const emptyObjects = Array.from({ length: 5 }, () => ({
      id: uuidv4(),
      name: '', P: false, A: false, T: false, B: false, notes: ''
    }));

    return [...mappedData, ...emptyObjects];
  };

  const [students, setStudents] = useState(initializeState);

  useEffect(() => {
    setStudents(initializeState());
  }, [data, submitted]);



  const handleCheckboxChange = (id, field) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.id === id) {
          // Ensure only one of P, A, or T can be selected at a time
          const updatedStudent = { ...student, P: false, A: false, T: false, [field]: !student[field] };
          // Keep B independent as it seems to be a separate flag
          return field === 'B' ? { ...updatedStudent, B: !student.B } : updatedStudent;
        }
        return student;
      })
    );
  };

  const handleTextInputChange = (id, field, value) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Student Name</Th><Th>P</Th><Th>A</Th><Th>P/T</Th><Th>B</Th><Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map(student => (
            <Tr key={student.id}>
              <Td>
                <TextInput
                style={{height:50}}
                  value={student.name}
                  onChange={e => handleTextInputChange(student.id, 'name', e.target.value)}
                />
              </Td>
              {['P', 'A', 'T', 'B'].map(field => (
                <Td key={field}>
                  <Checkbox
                    checked={student[field]}
                    onChange={() => handleCheckboxChange(student.id, field)}
                  />
                </Td>
              ))}
              <Td>
                <TextInput
                  value={student.notes}
                  onChange={e => handleTextInputChange(student.id, 'notes', e.target.value)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(AttendanceTable);
