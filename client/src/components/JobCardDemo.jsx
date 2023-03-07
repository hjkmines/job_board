import "./JobCard.css";
import {
    MDBRow,
    MDBCol,
    MDBContainer,
} from "mdb-react-ui-kit";
import JobCard from "./JobCard";

const JobCardDemo = () => {
    return (
        <MDBContainer className="m-4 w-100 bg-transparent border">
            <MDBRow>

                <MDBCol size="4">
                    <JobCard />
                </MDBCol>

                <MDBCol size="4">
                    <JobCard />
                </MDBCol>

                <MDBCol size="4">
                    <JobCard />

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default JobCardDemo;