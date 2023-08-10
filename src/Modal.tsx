import React from "react";

import {
  Title,
  Button,
  Text,
  Badge,
  Grid,
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody,
  TableCell,
} from "@tremor/react";

type ModalType = {
  showModal: boolean;
  setShowModal: Function;
  selectedRunner: any;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <Title>Details of GitHub Runner</Title>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-[#3b82f6] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-[#3b82f6] h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Grid numColsLg={2} numColsMd={2} className="gap-x-32 gap-y-4">
                    <div>
                      <Text>Name: </Text>
                      <Title>{props.selectedRunner.name}</Title>
                    </div>
                    <div>
                      <Text>Busy: </Text>
                      <Title>
                        <Badge size='lg' color={props.selectedRunner.busy ? "emerald": "rose"}>
                          {props.selectedRunner.busy ? 'Yes': 'No'}
                        </Badge>
                      </Title>
                    </div>
                    <div>
                      <Text>Repository: </Text>
                      <Title>{props.selectedRunner.repository}</Title>
                    </div>
                    <div>
                      <Text>Organization: </Text>
                      <Title>{props.selectedRunner.organization}</Title>
                    </div>
                    <div>
                      <Text>OS: </Text>
                      <Title>{props.selectedRunner.os}</Title>
                    </div>
                    <div>
                      <Text>Status: </Text>
                      <Title>{props.selectedRunner.status}</Title>
                    </div>
                  </Grid>

                  <Text className="mt-8">Labels: </Text>
                  <Table className="w-full">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>No</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.selectedRunner.labels.map((item: any, index: number) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <Text>{item.type}</Text>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end py-6 px-8 border-t border-solid border-slate-200 rounded-b">
                  <Button 
                    variant="light"
                    onClick={() => props.setShowModal(false)}
                  >Close</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}