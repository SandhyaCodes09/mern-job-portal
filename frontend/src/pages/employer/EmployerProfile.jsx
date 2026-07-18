import {useEffect,useState} from "react";
import {
    getEmployerProfile
}
from "../../services/authService";

import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Globe
}
from "lucide-react";

import {Link} from "react-router-dom";


export default function EmployerProfile(){


const [user,setUser]=useState(null);



useEffect(()=>{


    fetchProfile();


},[]);



const fetchProfile=async()=>{


    try{


        const res=await getEmployerProfile();

        console.log(res);


        setUser(res.user);


    }
    catch(error){

        console.log(error);

    }


};



if(!user){

    return(

        <div className="p-10 text-center">

            Loading Profile...

        </div>

    )

}



return(

<div className="min-h-screen bg-slate-100 p-8">


<div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">



{/* Header */}

<div className="flex items-center gap-6">


<img

src={
user.companyLogo
?
`http://localhost:5000/uploads/${user.companyLogo}`
:
"https://ui-avatars.com/api/?name="+user.first_name
}

className="w-28 h-28 rounded-full border-4 border-blue-600"

/>


<div>

<h1 className="text-3xl font-bold text-blue-700">

{user.companyName || "Company Name"}

</h1>


<p className="text-gray-500">

Employer Profile

</p>


</div>


</div>




{/* Details */}


<div className="grid md:grid-cols-2 gap-6 mt-10">


<div className="flex gap-3">

<Building2/>

<div>

<p className="font-semibold">
Company
</p>

<p>
{user.companyName || "-"}
</p>

</div>

</div>



<div className="flex gap-3">

<Mail/>

<div>

<p className="font-semibold">
Email
</p>

<p>
{user.email}
</p>

</div>

</div>




<div className="flex gap-3">

<Phone/>

<div>

<p className="font-semibold">
Phone
</p>

<p>
{user.phone_no || "-"}
</p>

</div>

</div>




<div className="flex gap-3">

<MapPin/>

<div>

<p className="font-semibold">
Address
</p>

<p>
{user.address || "-"}
</p>

</div>

</div>



</div>



{/* About */}


<div className="mt-8">


<h2 className="text-xl font-bold">

About Company

</h2>


<p className="text-gray-600 mt-2">

{user.about || "No information added"}

</p>


</div>




<div className="mt-10">


<Link

to="/employer/profile/edit"

className="bg-blue-700 text-white px-8 py-3 rounded-xl"

>

Edit Profile

</Link>


</div>



</div>


</div>


)


}