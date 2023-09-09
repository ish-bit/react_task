import { Button, Col, Divider, Dropdown, Menu, Row, Space, Table, Tag, message } from "antd"
import "./style.css"
import { useDeleteUserMutation, useGetAllEmployeesQuery } from "../../../redux/services/employeService";
import { useEffect, useState } from "react";
import elipsisIcon from "../../../aseets/elipsis.png"
import viewIcon from "../../../aseets/eye.png"
import deleteIcon from "../../../aseets/delete.png"

import editIcon from "../../../aseets/edit.png"
import { useNavigate } from "react-router-dom";
import { Page } from "../../../routes/config";


export const EmployeeList = () => {

    const {data,isError,isLoading,isSuccess, refetch} = useGetAllEmployeesQuery({})
    const [deleteEmployee, deleteEmployeeInfo] = useDeleteUserMutation()
    const [employeeList, setEmployeeList] = useState([])
    const [employee, setEmployee] =useState<any>({})
    const navigate = useNavigate()

    useEffect(()=>{
         if(isError){
            message.error("Error in fetching employees")
        }
    },[isError])

    useEffect(()=>{
        if(data?.length){
            setEmployeeList(data)
        }
    },[data])

    const onDelete = () => {
        deleteEmployee(employee?.id)
    }

    const onView =() => {
        navigate(Page.DETAILS,{state:{employee, edit: false}})
    }

    const onEdit =() => {
        navigate(Page.DETAILS,{state:{employee, edit: true}})
    }

    useEffect(()=>{
        const {isSuccess, isError} = deleteEmployeeInfo
        if(isSuccess){
        refetch()
           message.success("Employee Deleted successfully")
            
        } else if(isError){
            message.error("Error in deleting employee")
        }
    },[deleteEmployeeInfo])
    const items = [
        {
          key: '1',
          label: (
            <div onClick={onView}>
            <img src={viewIcon}/> <span className="menuItem">View</span>
            <Divider style={{margin: "0px"}}/>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={onEdit}>
            <img src={editIcon}/> <span className="menuItem">Edit</span>            
            <Divider style={{margin: "0px"}}/>

            </div>
          ),
        },
        {
            key: '3',
            label: (
              <div onClick={onDelete}>
              <img src={deleteIcon}/> <span className="menuItem">Delete</span>
              </div>
            ),
          },
    ]
    const columns = [
        {
            title: 'Name',
            dataIndex: 'id',
            key: 'id',
              render: (id:any, row:any) => <span>{row?.FirstName?.concat(" "+row?.FirstName)}</span>,
        },
        {
            title: 'DOB',
            dataIndex: 'DOB',
            key: 'dob',
        },
        {
            title: 'Start Date',
            dataIndex: 'StartDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'EndDate',
            key: 'endDate',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'description',
            render: (desc:any, row:any)=>{
            return(
            <Row>
            <Col span={20}>
            <div dangerouslySetInnerHTML={{__html:desc}}/>
            </Col>
            <Col span={4}>
                <Dropdown menu={{items}} trigger={["click"]}>
                <img src={elipsisIcon} className="menuIcon" onClick={()=>setEmployee(row)}/>
                </Dropdown>
                </Col>
            </Row>
            )
            }
        },
    ];





    return (
        <>
            <Row className="heading tableRow">
                <Col span={22}  className="heading">
                Employee List
                </Col>
                <Col span={2}>
                    <Button type="primary" style={{background: "#142A51", height:"40px"}} onClick={()=>navigate(Page.REGISTER)}>Add Empoyee</Button>
                </Col>
            </Row>
            <Row className="tableRow">
                <Col span={24}>
                    <Table bordered columns={columns} className="table" dataSource={employeeList} pagination={false} loading={isLoading}/>
                </Col>

            </Row>
        </>
    )
}