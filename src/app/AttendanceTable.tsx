import React, { useState, useCallback, useEffect } from 'react';
import { Student } from '@/constants';
import { Tr, Th, Tbody, Thead, Td, TableContainer, Table } from '@chakra-ui/react';

const Checkbox = ({ checked, onChange }: {checked: boolean, onChange: () => void}) => (
  <input type="checkbox" checked={checked} onChange={onChange} />
);

const TextInput = ({ value, onChange }: { value: string, onChange: () => void }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    style={{ width: '100%', backgroundColor: 'transparent', borderWidth: 0 }}
  />
);

const AttendanceTable = ({ data }: {data:Student[]}) => {
  const initializeState = () =>
    data.map(student => ({ ...student, P: false, A: false, T: false, B: false, notes: '' }));

  const [students, setStudents] = useState(initializeState);

  // Update state when `data` prop changes
  useEffect(() => {
    setStudents(initializeState());
  }, [data]);
  
  const handleCheckboxChange = (id: any, field: 'P'| 'A'| 'T'| 'B') => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, [field]: !student[field] } : student
      )
    );
  };

  const handleTextInputChange = (id: any, value: any) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, notes: value } : student
      )
    );
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th>P</Th>
            <Th>A</Th>
            <Th>T</Th>
            <Th>B</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map(student => (
            <Tr key={student.id}>
              <Td>{student.name}</Td>
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
                  onChange={(e: { target: { value: any; }; }) => handleTextInputChange(student.id, e.target.value)}
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
