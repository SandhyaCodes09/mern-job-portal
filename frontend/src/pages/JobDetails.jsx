import { useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import axios from "axios";

export default function JobDetails(){

    const {_id} =  useParams();
    const [job, setJob] =  useState(null);

    useEffect(()=>{
        const fetchJob = async ()=>{
            const res = await axios.get(`/api/jobs/${_id}`);
            setJob(res.data);
        }
        fetchJob();

    }, []);
  

    return(
    <div> 

        <h1>{job?.title}</h1>
         <p>{job?.company}</p>
         <p>{job?.location}</p>
         <p>{job?.description}</p>
         <p>{job?.salary}</p>
         <button>Apply Now</button>

    </div>
    )

}