import React, { useEffect, useState } from 'react';
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
import ACTIONS from './config/action';
import { socket } from './utils/socket';
import { usePagination } from './hooks/usePagination';
import { toast } from "react-hot-toast";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [runners, setRunners] = useState([]);
  const [runnerCount, setRunnerCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);
  const [bmxRunnerCount, setBmxRunnerCount] = useState(0);
  const [runCount, setRunCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [siblingCount, setSiblingCount] = useState(2);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const paginationRange = usePagination({
    currentPage: currentPage,
    totalCount: runnerCount,
    siblingCount: siblingCount,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (!('socket' in window)) {
      (window as any).socket = socket();
      initSocket();
    }
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue]);
  
  const initSocket = () => {
    // This part is main for socket.
    if (!(window as any).socket) {
        setTimeout(() => {
            initSocket()
        }, 100)
        return
    }

    if (!(window as any).socialListen) {
        (window as any).socket.on(
            ACTIONS.SEND_GITHUB_RUNNERS,
            ({orgs_length, run_count, runner_count, bmx_runner_count, runners}: any) => {
              setOrgCount(orgs_length);
              setRunCount(run_count);
              setRunnerCount(runner_count);
              setBmxRunnerCount(bmx_runner_count);
              setRunners(runners);
              console.log(runners);
              // toast.success('The positions are updated.');
            }
        );
        (window as any).socket.emit(ACTIONS.FETCH_GITHUB_RUNNERS, {});
        (window as any).socialListen = true;
    }
  }

  useEffect(() => {
    let firstPageIndex = (currentPage - 1) * pageSize;
    let lastPageIndex = firstPageIndex + pageSize;

    if(runnerCount <= lastPageIndex) {
      lastPageIndex = runnerCount;
    }

    if ((window as any).socket) {
      (window as any).socket.emit(ACTIONS.FETCH_GITHUB_PAGE_RUNNERS, {
        searchValue: debouncedValue, 
        firstPageIndex, 
        lastPageIndex
      })
    }
  }, [currentPage, runnerCount, debouncedValue])

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedValue])
  
  return (
    <div>
      <div className='flex gap-4 items-center px-[calc(10vw+48px)] border border-[#e5e7eb] py-4'>
        <div className='w-[40px] h-[40px] rounded-lg'>
          <img src="https://avatars.githubusercontent.com/b/6427?s=120&v=4" className='rounded-lg' alt="" />
        </div>
        <Title className='mt-0.5 text-[24px]'>
          Dashboard
        </Title>
      </div>
      <div className="px-12 py-12 mx-[10vw]">
        <Text>It shows better visibility to all GitHub Runners within the Nike GitHub enterprise in the form of an intuitive user-friendly dashboard.</Text>
        <Grid numColsMd={2} numColsLg={4} className="gap-12 mt-6">
          <Card className="max-w-xs mx-auto" decoration="top" decorationColor="blue">
            <Flex alignItems="start">
              <div className="truncate">
                <Text>Self-hosted GitHub runners</Text>
                <Metric>{runnerCount}</Metric>
              </div>
            </Flex>
          </Card>
          <Card className="max-w-xs mx-auto" decoration="top" decorationColor="cyan">
            <Flex alignItems="start">
              <div className="truncate">
                <Text>GitHub organizations</Text>
                <Metric>{orgCount}</Metric>
              </div>
            </Flex>
          </Card>
          <Card className="max-w-xs mx-auto" decoration="top" decorationColor="rose">
            <Flex alignItems="start">
              <div className="truncate">
                <Text>GitHub workflow runs</Text>
                <Metric>{runCount}</Metric>
              </div>
              <Badge>monthly</Badge>
            </Flex>
          </Card>
          <Card className="max-w-xs mx-auto" decoration="top" decorationColor="lime">
            <Flex alignItems="start">
              <div className="truncate">
                <Text>BMX Runners</Text>
                <Metric>{bmxRunnerCount}</Metric>
              </div>
            </Flex>
          </Card>
        </Grid>
        <Card className="mt-6">
          <Flex alignItems="start">
            <Title>GitHub Runners</Title>
            <TextInput 
              icon={SearchIcon} 
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)}
              className='w-[16vw]' 
              placeholder="Search..." 
            />
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
              {runners.map((item: any, index) => (
                <TableRow key={index}>
                  <TableCell>{pageSize * (currentPage - 1) + index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text>{item.organization}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.repository}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.os}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.status}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge size='lg' color={item.busy ? "emerald": "rose"}>
                      {item.busy ? 'Yes': 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant='secondary' 
                      className='flex' 
                      icon={EyeIcon}
                      onClick={() => {
                        setShowModal(true)
                        setSelectedIndex(index);
                      }}
                    >view</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paginator 
            currentPage={currentPage}
            totalCount={runnerCount}
            siblingCount={siblingCount}
            pageSize={pageSize}
            paginationRange={paginationRange}
            setCurrentPage={setCurrentPage}
          />
        </Card>
        <Modal 
          showModal={showModal}
          setShowModal={setShowModal}
          selectedRunner={runners[selectedIndex]}
        />
      </div>
    </div>
  );
}

export default App;
