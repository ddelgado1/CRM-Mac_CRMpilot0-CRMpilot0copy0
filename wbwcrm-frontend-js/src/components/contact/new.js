import {useState} from 'react';
const New = () => {
    const [customer, setCustomer] = useState(
        {
         company: "",
         contact: "",
         workers: [],
         title: "",
         email: "",
         number: "",
         old_address: "",
         new_address: "",
         category: "",
         broker_company: "",
         broker_name: "",
         broker_number: "",
         broker_email: "",
         architect_company: "",
         architect_name: "",
         architect_number: "",
         architect_email: "",
         consultant_company: "",
         consultant_name: "",
         consultant_number: "",
         consultant_email: ""
        });

    const handleSubmit = (e) => {

    }

    const handleChange = (e) => {
        setCustomer(oldState => ({ ...oldState, e.target.id: e.target.value}));
        setCustomer()
    }
    return(
        <>
            <h1>Create a new Contact</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Company: 
                    <input type="text" value={customer.company} id="company" onChange={e => handleChange(e)}></input>
                </label>
            </form>
        </>
    )
}

export default New;