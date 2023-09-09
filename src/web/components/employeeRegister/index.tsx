import { Card, Col, Row, Spin, message } from "antd"
import { EmployeeForm } from "../employeeForm"
import { useEffect, useState } from "react"
import { useCreateEmployeMutation } from "../../../redux/services/employeService"
import { Page } from "../../../routes/config"
import { useNavigate } from "react-router-dom"

export const RegistrationForm = () => { 
    const navigate = useNavigate()
    const [createEmlpoyee, createEmployeeInfo] = useCreateEmployeMutation()
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


    const onSubmit = () => {
      createEmlpoyee({...employeeDetails,
        Description: `<p>${employeeDetails?.Description}</p>`
    })
    }

    useEffect(()=>{
        if(createEmployeeInfo?.isSuccess){
            message.success("Employee added successfully").then(()=>navigate(Page.HOME))
        } else if(createEmployeeInfo?.isError){
            message.success("Error in adding employee")
            
        }

    },[createEmployeeInfo])
    return (
        <Spin spinning={createEmployeeInfo?.isLoading}>
            <Row className="heading tableRow" justify={"center"}>
                <Col span={12}  className="heading">
                Employee Registration Form
                </Col>
            </Row>
            <Row className="tableRow" justify={"center"}>
                <Col span={16}>
                <Card bordered>
                <EmployeeForm formId="register" employeeDetails={employeeDetails} setEmployeeDetails={setEmployeeDetails} onSubmit={onSubmit}/>
                </Card>
                </Col>
                

            </Row>
        </Spin>
    )
}
