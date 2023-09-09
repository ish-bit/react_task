import { Card, Col, Row, Spin, message } from "antd"
import { EmployeeForm } from "../employeeForm"
import { useEffect, useState } from "react"
import moment from "moment"
import { useUpdateEmployeeMutation } from "../../../redux/services/employeService"
import { useLocation, useNavigate } from "react-router-dom"
import editIcon from "../../../aseets/edit.png"
import "./style.css"


export const EmployeeDetailsForm = () => { 
    const navigate = useNavigate()
    const [createEmlpoyee, createEmployeeInfo] = useUpdateEmployeeMutation()
    const location = useLocation()
    const [isEditable, setEditable] = useState(false)
    const [employeeDetails, setEmployeeDetails] = useState({
        FirstName: "",
        LastName : "",
        DOB : null,
        Study: "",
        StartDate: null,
        EndDate:  null,
        CurrentSalary: "",
        Description: ""
    })

    useEffect(()=>{
        if(location?.state?.employee){
            const {DOB, StartDate, EndDate} = location?.state?.employee;
            setEmployeeDetails({...location?.state?.employee,
                 DOB: moment(DOB),
                 StartDate: moment(StartDate),
                 EndDate: moment(EndDate)
                })
        }
        if(location?.state?.edit != undefined){
            setEditable(location?.state?.edit)
        }

    },[location?.state])
    const onSubmit = () => {
      createEmlpoyee({...employeeDetails,
        Description: `<p>${employeeDetails?.Description}</p>`
    })
    }

    useEffect(()=>{
        if(createEmployeeInfo?.isSuccess){
            message.success("Employee details updated successfully")
            setEditable(false)
        } else if(createEmployeeInfo?.isError){
            message.success("Error in updating employee details")
            
        }

    },[createEmployeeInfo])
    return (
        <Spin spinning={createEmployeeInfo?.isLoading}>
            <Row>
                <Col span={24}>
                <p style={{padding: "20px", float: "right"}} className="editButton" onClick={()=>setEditable(true)}><img src={editIcon}/>Edit</p>
                </Col>
                </Row>
            <Row className="heading tableRow" justify={"center"}>
                <Col span={12}  className="heading">
                Employee Details Form
                
                </Col>
            </Row>
            <Row className="tableRow" justify={"center"}>
                <Col span={16}>
                <Card bordered>
                <EmployeeForm formId="update" employeeDetails={employeeDetails} setEmployeeDetails={setEmployeeDetails} onSubmit={onSubmit} isEditable={isEditable}/>
                </Card>
                </Col>
                

            </Row>
        </Spin>
    )
}
