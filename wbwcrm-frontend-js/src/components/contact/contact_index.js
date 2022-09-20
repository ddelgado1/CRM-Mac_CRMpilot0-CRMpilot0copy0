import './contact.css'
import { getContacts } from '../../actions/contact';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const Index = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts)
    useEffect(() => {
        dispatch(getContacts())
      }, [dispatch]);
    
    console.log(contacts)
    
    return(
        
        <div className="index">
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Category</th>
                        <th>WBW Worker</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.contacts.length === 0 ? null : 
                    contacts.contacts.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.company}</td>
                            <td>{val.contact_name}</td>
                            <td>{val.category}</td>
                            <td>Hi</td>
                            {/* TODO make the workers thing work */}
                        </tr>
                    )
                    })}  
                </tbody>
                
            </table>
        </div>
    )
}



export default Index;




    /* <% @contacts.each do |contact| %>
    <tr>
        <td><%= contact.company %></td>
        <td><%= contact.name %></td>
        <td><%= contact.category %></td>
        <td><% contact.workers.each do |worker| %>
            <%= worker.name %>   
            <% end %>
        </td>
        <td><%= link_to "View this Contact", "/contacts/#{contact.id}" %></td>
    </tr>

    
    
    <br><br>
    
<% end %> */