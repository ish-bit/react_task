import { Row, Col, Form, Button, Input, DatePicker, Select } from "antd";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { Page } from "../../../routes/config";
import { StudyOptions } from "../../../utility/constants";




export const EmployeeForm = (props: any) => {
    const { formId, employeeDetails, setEmployeeDetails, onSubmit, isEditable } = props;
    const navigate = useNavigate()

    const getEditStatus = () => {
        switch (formId) {
            case "register":
                return true;
            case "update":
                return isEditable
        }
    }
    const onChange = (ev: any) => {
        const { name, value } = ev?.target;
        setEmployeeDetails({
            ...employeeDetails,
            [name]: value
        })
    }
    function getSubmitButtonText() {
        switch (formId) {
            case "register":
                return "Add Employee";
            case "update":
                return "Save"
        }


    }

    function onStudySelect(value: any) {
        setEmployeeDetails({
            ...employeeDetails,
            ["Study"]: value
        })
    }

    function handleDateSelection(field: string, date: any, dateString: any) {
        setEmployeeDetails({
            ...employeeDetails,
            [field]: dateString
        })
    }
    return (
        <Form id={formId} onFinish={onSubmit} layout="vertical" disabled={!getEditStatus()} key={`${employeeDetails?.id}`}>
            <Row gutter={[0, 20]} justify={"space-between"}>
                <Col span={10}>
                    <Form.Item rules={[{ required: true }]} label="Firstname" name={"FirstName"} initialValue={employeeDetails?.FirstName}>
                        <Input className="inputs" placeholder="Enter your first name" name="FirstName" value={employeeDetails?.FirstName} defaultValue={employeeDetails?.FirstName} onChange={onChange} />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item rules={[{ required: true }]} label="Lastname" name={"LastName"} initialValue={employeeDetails?.LastName}>
                        <Input className="inputs" name="LastName" placeholder="Enter your last name" value={employeeDetails?.LastName} onChange={onChange} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="DOB" name={"DOB"} initialValue={employeeDetails?.DOB}>
                        <DatePicker format={"YYYY-MM-DD"} placeholder="Enter your fDOB" className="inputs" style={{ width: "100%" }} value={employeeDetails?.DOB} onChange={(date, dateString) => handleDateSelection("DOB", date, dateString)} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Study" name={"Study"} initialValue={employeeDetails?.Study}>
                        <Select className="inputs" placeholder="Select your study" value={employeeDetails?.Study} options={StudyOptions} onChange={onStudySelect} />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label="Start Date" name={"StartDate"} initialValue={employeeDetails?.StartDate}>
                        <DatePicker className="inputs" style={{ width: "100%" }} placeholder="Enter your Start Date" value={employeeDetails?.StartDate} onChange={(date, dateString) => handleDateSelection("StartDate", date, dateString)} />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label="End Date" name={"EndDate"} initialValue={employeeDetails?.EndDate}>
                        <DatePicker className="inputs" style={{ width: "100%" }} placeholder="Enter your End Date" value={employeeDetails?.EndDate} onChange={(date, dateString) => handleDateSelection("EndDate", date, dateString)} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Current Salary" name={"CurrentSalary"} initialValue={employeeDetails?.CurrentSalary}>
                        <Input className="inputs" name="CurrentSalary"placeholder="Enter your current salary" value={employeeDetails?.CurrentSalary} onChange={onChange} />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Description" name={"Description"} initialValue={employeeDetails?.Description}>
                        <Input.TextArea rows={5} className="inputs" name="Description" value={employeeDetails?.CurDescriptionrentSalary} onChange={onChange} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"} gutter={40}>
                <Col span={6}>
                    <Button type="default" className="buttons secondary" onClick={() => navigate(Page.HOME)}>Cancel</Button>

                </Col>
                <Col span={6}>
                    <Button type="primary" className="buttons primary" htmlType="submit" form={formId}>{getSubmitButtonText()}</Button>

                </Col>
            </Row>

        </Form>
    )
}