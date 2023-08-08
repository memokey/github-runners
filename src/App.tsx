import React, { useState } from 'react';
import { data } from './data';
import './styles/App.css';
import { 
  Card, 
  Grid, 
  Text, 
  Metric, 
  Title, 
  Badge, 
  Flex, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell,
  TextInput,
  Button,
} from "@tremor/react";
import { EyeIcon, SearchIcon } from "@heroicons/react/solid";
import Paginator from './Paginator';
import Modal from './Modal';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="px-12 py-12 mx-[10vw]">
      <Title>GitHub Runners Dashboard</Title>
      <Text>It shows better visibility to all GitHub Runners within the Nike GitHub enterprise in the form of an intuitive user-friendly dashboard.</Text>
      <Grid numColsMd={2} numColsLg={4} className="gap-12 mt-6">
        <Card className="max-w-xs mx-auto" decoration="top" decorationColor="blue">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Self-hosted GitHub runners</Text>
              <Metric>71,465</Metric>
            </div>
          </Flex>
        </Card>
        <Card className="max-w-xs mx-auto" decoration="top" decorationColor="cyan">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>GitHub organizations</Text>
              <Metric>71,465</Metric>
            </div>
          </Flex>
        </Card>
        <Card className="max-w-xs mx-auto" decoration="top" decorationColor="rose">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>GitHub workflow runs</Text>
              <Metric>71,465</Metric>
            </div>
            <Badge>monthly</Badge>
          </Flex>
        </Card>
      </Grid>
      <Card className="mt-6">
        <Flex alignItems="start">
          <Title>GitHub Runners</Title>
          <TextInput icon={SearchIcon} className='w-[20vw]' placeholder="Search..." />
        </Flex>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Repository</TableHeaderCell>
              <TableHeaderCell>Organization</TableHeaderCell>
              <TableHeaderCell>OS</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Busy</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Text>{item.organization}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.repository}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.Role}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.departement}</Text>
                </TableCell>
                <TableCell>
                  <Badge size='lg' color={item.status === 'Yes' ? "emerald": "rose"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant='secondary' 
                    className='flex' 
                    icon={EyeIcon}
                    onClick={() => setShowModal(true)}
                  >view</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Paginator />
      </Card>
      <Modal 
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default App;
